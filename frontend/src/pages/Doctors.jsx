import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Typography, Button, IconButton, Paper, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MaterialReactTable } from 'material-react-table';  
import {DoctorFormModal} from '../components/DoctorFormModal';
import { apiCreateDoctor, apiDeleteDoctor, apiFetchDoctors, apiUpdateDoctor } from '../mock-api';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null); // null for Add, doctor object for Edit
  const [error, setError] = useState(null);

  // --- R E A D (Fetch Doctors) ---
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetchDoctors();
      setDoctors(data);
    } catch (err) {
      setError('Failed to fetch doctors data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // --- C R E A T E / U P D A T E (Modal Handlers) ---
  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (doctor) => {
    setEditingDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
  };

  const handleFormSubmit = async (formData) => {
    setError(null);
    try {
      if (editingDoctor) {
        // UPDATE operation
        await apiUpdateDoctor(formData);
        console.log('Doctor updated:', formData.name);
      } else {
        // CREATE operation
        await apiCreateDoctor(formData);
        console.log('Doctor created:', formData.name);
      }
      fetchDoctors(); // Refresh table data
      handleCloseModal();
    } catch (err) {
      setError(`Failed to ${editingDoctor ? 'update' : 'add'} doctor.`);
      console.error(err);
    }
  };

  // --- D E L E T E (API Call) ---
  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setError(null);
      try {
        await apiDeleteDoctor(doctorId);
        fetchDoctors(); // Refresh table data
        console.log('Doctor deleted:', doctorId);
      } catch (err) {
        setError('Failed to delete doctor.');
        console.error(err);
      }
    }
  };

  // Define the table columns
  const columns = useMemo(() => [
    { accessorKey: 'name', header: 'Name', size: 200 },
    { accessorKey: 'specialty', header: 'Specialty', size: 150 },
    { accessorKey: 'email', header: 'Email', size: 250 },
    { accessorKey: 'phone', header: 'Phone', size: 100 },
    {
      // Custom Action Column
      id: 'actions',
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '0.5rem' }}>
          <IconButton color="primary" onClick={() => handleOpenEdit(row.original)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteDoctor(row.original.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ], [doctors]); // Recreate columns if doctors change (optional dependency, primarily for the action handlers)

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctors
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Manage the doctors available for referrals and assessment requests.
      </Typography>

      <Paper elevation={1} sx={{ p: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Add New Doctor Button - Matches the screenshot position */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
          >
            Add New Doctor
          </Button>
        </Box>

        {/* Material React Table */}
        <MaterialReactTable
          columns={columns}
          data={doctors}
          state={{ isLoading: loading }}
          enableTopToolbar={false}
          enableBottomToolbar={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableGlobalFilter={false}
          muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
        />
      </Paper>

      {/* The Add/Edit Doctor Modal */}
      <DoctorFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        doctorData={editingDoctor}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Doctors;