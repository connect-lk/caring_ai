import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal, Box, Typography, TextField, Button, Grid, Alert
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

// Form Validation Schema
const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  specialty: yup.string().required('Specialty is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().matches(/^[0-9]*$/, 'Phone number is not valid').nullable(),
});

export const DoctorFormModal = ({ open, onClose, doctorData, onSubmit }) => {
  const isEditing = !!doctorData;
  const initialValues = {
    name: doctorData?.name || '',
    specialty: doctorData?.specialty || '',
    email: doctorData?.email || '',
    phone: doctorData?.phone || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Pass the form data and the original doctor ID (if editing)
      onSubmit({ ...values, id: doctorData?.id });
      setSubmitting(false);
      onClose();
    },
    enableReinitialize: true, // Key for switching between ADD and EDIT mode
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {isEditing ? 'Edit Doctor' : 'Add New Doctor'}
        </Typography>

        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          {/* Specialty Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Specialty"
              name="specialty"
              value={formik.values.specialty}
              onChange={formik.handleChange}
              error={formik.touched.specialty && Boolean(formik.errors.specialty)}
              helperText={formik.touched.specialty && formik.errors.specialty}
            />
          </Grid>
          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          {/* Phone Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button onClick={onClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
            {isEditing ? 'Save Changes' : 'Add Doctor'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
 