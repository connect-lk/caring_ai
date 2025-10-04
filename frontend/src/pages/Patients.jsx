import React, { useState, useEffect, useMemo } from 'react';
import {
  Box, Typography, Button, IconButton, Paper, Alert, CircularProgress,
  TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel,
  Pagination, Chip, Menu, ListItemIcon, ListItemText
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import { MaterialReactTable } from 'material-react-table';  
import { useAuth } from '../contexts/AuthContext';
import PatientFormModal from '../components/PatientFormModal';
import { 
  apiCreatePatient, 
  apiDeletePatient, 
  apiFetchPatients, 
  apiUpdatePatient,
  apiReactivatePatient,
  apiExportPatients
} from '../mock-api';

const Patients = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null); // null for Add, patient object for Edit
  const [error, setError] = useState(null);
  const [serverOnline, setServerOnline] = useState(true);
  
  // Pagination and filtering states
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);

  // --- R E A D (Fetch Patients) ---
  const fetchPatients = async (page = pagination.page, search = searchTerm, status = statusFilter) => {
    // Don't fetch if user is not authenticated
    if (!isAuthenticated) {
      setLoading(false);
      setError('Please log in to access patient data.');
      setPatients([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: pagination.limit,
        search,
        status
      };
      const response = await apiFetchPatients(params);
      setPatients(response.data || []);
      setPagination(prev => ({
        ...prev,
        page: response.pagination?.currentPage || page,
        total: response.pagination?.totalPatients || 0,
        totalPages: response.pagination?.totalPages || 0
      }));
      setServerOnline(true);
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch') 
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : err.message.includes('Authentication required')
        ? 'Please log in to access patient data.'
        : `Failed to fetch patients data: ${err.message}`;
      setError(errorMessage);
      setServerOnline(false);
      console.error('Error fetching patients:', err);
      setPatients([]); // Clear patients on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch patients when authentication is determined
    if (!authLoading) {
      fetchPatients();
    }
  }, [isAuthenticated, authLoading]);

  // --- C R E A T E / U P D A T E (Modal Handlers) ---
  const handleOpenAdd = () => {
    setEditingPatient(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (patient) => {
    setEditingPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const handleFormSubmit = async (formData) => {
    setError(null);
    try {
      if (editingPatient) {
        // UPDATE operation - pass the patient ID
        await apiUpdatePatient(editingPatient.id, formData);
        console.log('Patient updated:', formData.name);
      } else {
        // CREATE operation
        await apiCreatePatient(formData);
        console.log('Patient created:', formData.name);
      }
      fetchPatients(); // Refresh table data
      handleCloseModal();
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to ${editingPatient ? 'update' : 'add'} patient: ${err.message}`;
      setError(errorMessage);
      console.error('Error in form submit:', err);
    }
  };

  // --- D E L E T E (API Call) ---
  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to deactivate this patient? This action can be reversed later.')) {
      setError(null);
      try {
        await apiDeletePatient(patientId);
        fetchPatients(); // Refresh table data
        console.log('Patient deactivated:', patientId);
      } catch (err) {
        const errorMessage = err.message.includes('Failed to fetch')
          ? 'Unable to connect to server. Please ensure the backend server is running.'
          : `Failed to deactivate patient: ${err.message}`;
        setError(errorMessage);
        console.error('Error deactivating patient:', err);
      }
    }
  };

  const handleReactivatePatient = async (patientId) => {
    if (!window.confirm('Are you sure you want to reactivate this patient?')) {
      return;
    }
    setError(null);
    try {
      await apiReactivatePatient(patientId);
      console.log('Patient reactivated:', patientId);
      fetchPatients(); // Refresh table data
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to reactivate patient: ${err.message}`;
      setError(errorMessage);
      console.error('Error reactivating patient:', err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Debounce search - fetch after 500ms of no typing
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      fetchPatients(1, event.target.value, statusFilter);
    }, 500);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    fetchPatients(1, searchTerm, event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    fetchPatients(newPage, searchTerm, statusFilter);
  };

  const handleExport = async (format) => {
    setExportMenuAnchor(null);
    setError(null);
    try {
      // Ensure searchTerm is a string, not a function
      const safeSearchTerm = typeof searchTerm === 'string' ? searchTerm : '';
      const safeStatusFilter = typeof statusFilter === 'string' ? statusFilter : 'Active';
      
      const params = {
        format,
        search: safeSearchTerm,
        status: safeStatusFilter
      };
      
      const response = await apiExportPatients(params);
      
      // Handle different response types
      let exportData;
      let mimeType;
      
      if (format === 'csv') {
        // CSV response is a string
        exportData = response;
        mimeType = 'text/csv';
      } else {
        // JSON response is an object, stringify it
        exportData = typeof response === 'string' ? response : JSON.stringify(response, null, 2);
        mimeType = 'application/json';
      }
      
      // Create download link
      const blob = new Blob([exportData], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `patients_export.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to export patients: ${err.message}`;
      setError(errorMessage);
      console.error('Error exporting patients:', err);
    }
  };

  const handleRefresh = () => {
    fetchPatients(pagination.page, searchTerm, statusFilter);
  };

  // Define the table columns
  const columns = useMemo(() => [
    {
      accessorKey: 'patientId',
      header: 'Patient ID',
      size: 120,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {cell.getValue()}
        </Typography>
      )
    },
    { 
      accessorKey: 'name', 
      header: 'Patient Name', 
      size: 200,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {cell.getValue()}
        </Typography>
      )
    },
    { 
      accessorKey: 'email', 
      header: 'Email Address', 
      size: 250,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ color: 'primary.main' }}>
          {cell.getValue()}
        </Typography>
      )
    },
    { 
      accessorKey: 'contactNo', 
      header: 'Contact Number', 
      size: 150,
      Cell: ({ cell }) => (
        <Typography variant="body2">
          {cell.getValue()}
        </Typography>
      )
    },
    { 
      accessorKey: 'age', 
      header: 'Age', 
      size: 80,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {cell.getValue()} years
        </Typography>
      )
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 100,
      Cell: ({ cell }) => {
        const status = cell.getValue();
        return (
          <Chip
            label={status}
            color={status === 'Active' ? 'success' : 'default'}
            size="small"
            variant="outlined"
          />
        );
      }
    },
    {
      // Custom Action Column
      id: 'actions',
      header: 'Actions',
      size: 160,
      Cell: ({ row }) => {
        const isActive = row.original.status === 'Active';
        return (
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <IconButton 
              color="primary" 
              onClick={() => handleOpenEdit(row.original)}
              title="Edit patient information"
            >
              <EditIcon />
            </IconButton>
            {isActive ? (
              <IconButton 
                color="error" 
                onClick={() => handleDeletePatient(row.original.id)}
                title="Deactivate patient"
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton 
                color="success" 
                onClick={() => handleReactivatePatient(row.original.id)}
                title="Reactivate patient"
              >
                <RefreshIcon />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ], [patients]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Manage patient records with HIPAA-compliant data protection. All patient information is encrypted and securely stored.
      </Typography>

      <Paper elevation={1} sx={{ p: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Authentication Status */}
        {!isAuthenticated && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Authentication Required:</strong> Please log in to access patient data and manage patient records.
            </Typography>
          </Alert>
        )}

        {/* Server Status and HIPAA Compliance Notice */}
        {!serverOnline && isAuthenticated && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Server Offline:</strong> Unable to connect to the backend server. 
              Please ensure the server is running to access patient data.
            </Typography>
          </Alert>
        )}
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>HIPAA Compliance Notice:</strong> All patient data is encrypted at rest and in transit. 
            Access is logged and monitored for security compliance.
            {serverOnline && isAuthenticated && <span> • Server Status: <strong style={{color: 'green'}}>Online</strong></span>}
            {isAuthenticated && user && <span> • User: <strong>{user.name || user.email}</strong></span>}
          </Typography>
        </Alert>

        {/* Search and Filter Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by name, email, contact, or ID..."
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="All">All</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={!serverOnline || !isAuthenticated}
          >
            Refresh
          </Button>
        </Box>

        {/* Add New Patient Button and Export Menu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {pagination.total} patients ({statusFilter === 'All' ? 'All statuses' : statusFilter})
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={(e) => setExportMenuAnchor(e.currentTarget)}
              disabled={!serverOnline || !isAuthenticated}
            >
              Export
            </Button>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              disabled={!serverOnline || !isAuthenticated}
              sx={{ 
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark'
                },
                '&:disabled': {
                  backgroundColor: 'grey.400'
                }
              }}
            >
              Add New Patient
            </Button>
          </Box>
        </Box>

        {/* Export Menu */}
        <Menu
          anchorEl={exportMenuAnchor}
          open={Boolean(exportMenuAnchor)}
          onClose={() => setExportMenuAnchor(null)}
        >
          <MenuItem onClick={() => handleExport('csv')}>
            <ListItemIcon>
              <FileDownloadIcon />
            </ListItemIcon>
            <ListItemText>Export as CSV</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleExport('json')}>
            <ListItemIcon>
              <FileDownloadIcon />
            </ListItemIcon>
            <ListItemText>Export as JSON</ListItemText>
          </MenuItem>
        </Menu>

        {/* Material React Table */}
        {authLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Checking authentication...</Typography>
          </Box>
        ) : (
          <>
            <MaterialReactTable
              columns={columns}
              data={patients}
              state={{ isLoading: loading }}
              enableTopToolbar={false}
              enableBottomToolbar={false}
              enableDensityToggle={false}
              enableFullScreenToggle={false}
              enableGlobalFilter={false}
              muiTableContainerProps={{ 
                sx: { 
                  maxHeight: '600px',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1
                } 
              }}
              muiTableHeadCellProps={{
                sx: {
                  backgroundColor: 'grey.50',
                  fontWeight: 'bold'
                }
              }}
            />
            
            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Paper>

      {/* The Add/Edit Patient Modal */}
      <PatientFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        editingPatient={editingPatient}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Patients;
