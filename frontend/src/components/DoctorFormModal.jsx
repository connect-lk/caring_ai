import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment
} from '@mui/material';
import { Person, Email, Phone, MedicalServices } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflow: 'auto'
};

const validationSchema = yup.object({
  name: yup.string()
    .required('Doctor name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup.string()
    .required('Email address is required')
    .email('Please enter a valid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  phone: yup.string()
    .required('Phone number is required')
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must not exceed 20 characters'),
  specialty: yup.string()
    .required('Medical specialty is required')
    .min(2, 'Specialty must be at least 2 characters')
    .max(100, 'Specialty cannot exceed 100 characters')
});

const DoctorFormModal = ({ open, onClose, onSubmit, editingDoctor }) => {
  const initialValues = {
    name: editingDoctor?.name || '',
    email: editingDoctor?.email || '',
    phone: editingDoctor?.phone || '',
    specialty: editingDoctor?.specialty || ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await onSubmit(values);
        onClose();
      } catch (error) {
        console.error('Error submitting doctor form:', error);
        setFieldError('general', error.message || 'Failed to save doctor');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h6" component="h2" gutterBottom>
          {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
        </Typography>

        {/* HIPAA Notice */}
        <Alert severity="info" sx={{ mb: 3 }}>
          This form collects Protected Health Information (PHI) and is secured in compliance with HIPAA regulations.
        </Alert>

        {/* Doctor Name */}
        <TextField
          fullWidth
          name="name"
          label="Doctor Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Email Address */}
        <TextField
          fullWidth
          name="email"
          label="Email Address"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Phone Number */}
        <TextField
          fullWidth
          name="phone"
          label="Phone Number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Medical Specialty */}
        <TextField
          fullWidth
          name="specialty"
          label="Medical Specialty"
          value={formik.values.specialty}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.specialty && Boolean(formik.errors.specialty)}
          helperText={formik.touched.specialty && formik.errors.specialty}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MedicalServices />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* General Error */}
        {formik.errors.general && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formik.errors.general}
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
          >
            {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DoctorFormModal;