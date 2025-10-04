import Doctor from '../models/Doctor.js';
import { encrypt } from '../utils/fieldEncryption.js';
import mongoose from 'mongoose';

// CREATE - Add new doctor with HIPAA compliance
export const createDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialty } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name || !email || !phone || !specialty) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and specialty are required fields'
      });
    }

    // Check if doctor with email already exists
    const existingDoctor = await Doctor.findOne({ email: encrypt(email) });
    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: 'A doctor with this email address already exists'
      });
    }

    // Create new doctor
    const doctorData = {
      name,
      email,
      phone,
      specialty,
      createdBy: userId
    };

    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    // Log doctor creation for audit
    console.log(`Doctor created: ${newDoctor.doctorId} by user: ${userId}`);

    res.status(201).json({
      success: true,
      message: 'Doctor created successfully',
      data: newDoctor
    });

  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create doctor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// READ - Get all doctors with pagination and filtering
export const getDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const skip = (page - 1) * limit;
    
    // Build query
    let query = {};
    
    // Filter by status (default to active only)
    const status = req.query.status || 'Active';
    console.log('DEBUG: Status filter:', status);
    
    if (status !== 'All') {
      query.status = status;
    }
    
    // Only apply search if there's actually a search term
    if (search && typeof search === 'string' && search.trim().length > 0) {
      console.log('DEBUG: Applying global search filter for:', search);
      const searchTerm = search.trim();
      
      // Global search across multiple fields
      query.$or = [
        // Search by doctor ID (exact match or partial)
        { doctorId: { $regex: searchTerm, $options: 'i' } },
        
        // Note: For encrypted fields (name, email, phone, specialty), we need to search the encrypted values
        // This is a limitation of encrypted fields - we can't do case-insensitive regex on encrypted data
        // We'll search for exact encrypted matches for these fields
        { name: encrypt(searchTerm) },
        { email: encrypt(searchTerm) },
        { phone: encrypt(searchTerm) },
        { specialty: encrypt(searchTerm) }
      ];
    } else {
      console.log('DEBUG: No search term, fetching all doctors with status filter');
    }

    // Get doctors with pagination
    const doctors = await Doctor.find(query)
      .select('-__v')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email');

    const total = await Doctor.countDocuments(query);

    res.status(200).json({
      success: true,
      data: doctors,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalDoctors: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// READ - Get single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    const doctor = await Doctor.findById(id)
      .select('-__v')
      .populate('createdBy', 'name email');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: doctor
    });

  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// UPDATE - Update doctor information
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, specialty } = req.body;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check for email uniqueness if email is being updated
    if (email && email !== doctor.email) {
      const existingDoctor = await Doctor.findOne({ 
        email: encrypt(email),
        _id: { $ne: id }
      });
      if (existingDoctor) {
        return res.status(409).json({
          success: false,
          message: 'Another doctor with this email address already exists'
        });
      }
    }

    // Update doctor data - allow the required fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (specialty !== undefined) updateData.specialty = specialty;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-__v');

    // Log update for audit
    console.log(`Doctor updated: ${updatedDoctor.doctorId} by user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Doctor updated successfully',
      data: updatedDoctor
    });

  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update doctor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// DELETE - Deactivate doctor (HIPAA compliant)
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if already deactivated
    if (doctor.status === 'Inactive') {
      return res.status(400).json({
        success: false,
        message: 'Doctor is already deactivated'
      });
    }

    // Deactivate the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        status: 'Inactive',
        deactivatedAt: new Date(),
        deactivatedBy: userId
      },
      { new: true }
    );

    // Log deactivation for audit
    console.log(`Doctor deactivated: ${updatedDoctor.doctorId} by user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Doctor deactivated successfully',
      data: updatedDoctor
    });

  } catch (error) {
    console.error('Error deactivating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to deactivate doctor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// REACTIVATE - Reactivate doctor
export const reactivateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if already active
    if (doctor.status === 'Active') {
      return res.status(400).json({
        success: false,
        message: 'Doctor is already active'
      });
    }

    // Reactivate the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        status: 'Active',
        deactivatedAt: null,
        deactivatedBy: null
      },
      { new: true }
    );

    // Log reactivation for audit
    console.log(`Doctor reactivated: ${updatedDoctor.doctorId} by user: ${userId}`);

    res.status(200).json({
      success: true,
      message: 'Doctor reactivated successfully',
      data: updatedDoctor
    });

  } catch (error) {
    console.error('Error reactivating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reactivate doctor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// EXPORT - Export doctors data
export const exportDoctors = async (req, res) => {
  try {
    const { format, search, status } = req.query;
    
    // Build query - Get all doctors for export
    let query = {};

    // Get all matching doctors
    const doctors = await Doctor.find(query)
      .select('-__v -createdAt -updatedAt')
      .sort({ createdAt: -1 });

    // If no format specified, default to csv
    const exportFormat = format || 'csv';
    
    if (exportFormat === 'csv') {
      // Generate CSV
      const csvHeader = 'Doctor ID,Name,Email,Phone,Specialty,Status\n';
      const csvData = doctors.map(doctor => {
        return `"${doctor.doctorId}","${doctor.name}","${doctor.email}","${doctor.phone}","${doctor.specialty}","${doctor.status}"`;
      }).join('\n');
      
      const csv = csvHeader + csvData;
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="doctors_export.csv"');
      res.send(csv);
    } else if (exportFormat === 'json') {
      // Transform doctors data to clean JSON format
      const cleanDoctors = doctors.map(doctor => ({
        doctorId: doctor.doctorId,
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        specialty: doctor.specialty,
        status: doctor.status
      }));
      
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename="doctors_export.json"');
      res.json(cleanDoctors);
    } else {
      res.status(400).json({
        success: false,
        message: 'Unsupported export format. Supported formats: csv, json'
      });
    }

  } catch (error) {
    console.error('Error exporting doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export doctors',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// GET - Get doctor statistics
export const getDoctorStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const specialties = await Doctor.aggregate([
      {
        $group: {
          _id: '$specialty',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDoctors,
        specialties
      }
    });

  } catch (error) {
    console.error('Error fetching doctor statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};
