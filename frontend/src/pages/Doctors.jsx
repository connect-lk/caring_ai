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
import RefreshIcon from '@mui/icons-material/Refresh';
import { MaterialReactTable } from 'material-react-table';  
import { useAuth } from '../contexts/AuthContext';
import DoctorFormModal from '../components/DoctorFormModal';
import { 
  apiCreateDoctor, 
  apiDeleteDoctor, 
  apiFetchDoctors, 
  apiUpdateDoctor,
  apiReactivateDoctor,
  apiExportDoctors
} from '../mock-api';

const Doctors = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null); // null for Add, doctor object for Edit
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

  // Fetch doctors from API
  const fetchDoctors = async (page = pagination.page, search = searchTerm, status = statusFilter) => {
    if (!isAuthenticated) {
      setLoading(false);
      setError('Please log in to access doctor data.');
      setDoctors([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const params = {
        page,
        limit: pagination.limit,
        search,
        status
      };
      const response = await apiFetchDoctors(params);
      setDoctors(response.data || []);
      setPagination(prev => ({
        ...prev,
        page: response.pagination?.currentPage || page,
        total: response.pagination?.totalDoctors || 0,
        totalPages: response.pagination?.totalPages || 0
      }));
      setServerOnline(true);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to fetch doctors: ${err.message}`;
      setError(errorMessage);
      setDoctors([]);
      setServerOnline(false);
    } finally {
      setLoading(false);
    }
  };

  // Load doctors on component mount and when authentication changes
  useEffect(() => {
    if (!authLoading) {
      fetchDoctors();
    }
  }, [isAuthenticated, authLoading]);

  // Modal handlers
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

  // Form submission handler
  const handleFormSubmit = async (formData) => {
    setError(null);
    try {
      if (editingDoctor) {
        // UPDATE operation - pass the doctor ID
        await apiUpdateDoctor(editingDoctor.id, formData);
        console.log('Doctor updated:', formData.name);
      } else {
        // CREATE operation
        await apiCreateDoctor(formData);
        console.log('Doctor created:', formData.name);
      }
      fetchDoctors(); // Refresh table data
      handleCloseModal();
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to ${editingDoctor ? 'update' : 'add'} doctor: ${err.message}`;
      setError(errorMessage);
      console.error('Error in form submit:', err);
    }
  };

  // Delete doctor handler
  const handleDeleteDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure you want to deactivate this doctor? This action can be reversed later.')) {
      return;
    }

    try {
      await apiDeleteDoctor(doctorId);
      console.log('Doctor deactivated:', doctorId);
      fetchDoctors(); // Refresh table data
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to deactivate doctor: ${err.message}`;
      setError(errorMessage);
      console.error('Error deactivating doctor:', err);
    }
  };

  const handleReactivateDoctor = async (doctorId) => {
    if (!window.confirm('Are you sure you want to reactivate this doctor?')) {
      return;
    }
    setError(null);
    try {
      await apiReactivateDoctor(doctorId);
      console.log('Doctor reactivated:', doctorId);
      fetchDoctors(); // Refresh table data
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to reactivate doctor: ${err.message}`;
      setError(errorMessage);
      console.error('Error reactivating doctor:', err);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Debounce search - fetch after 500ms of no typing
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      fetchDoctors(1, event.target.value, statusFilter);
    }, 500);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    fetchDoctors(1, searchTerm, event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    fetchDoctors(newPage, searchTerm, statusFilter);
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
      
      const response = await apiExportDoctors(params);
      
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
      link.download = `doctors_export.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage = err.message.includes('Failed to fetch')
        ? 'Unable to connect to server. Please ensure the backend server is running.'
        : `Failed to export doctors: ${err.message}`;
      setError(errorMessage);
      console.error('Error exporting doctors:', err);
    }
  };

  const handleRefresh = () => {
    fetchDoctors(pagination.page, searchTerm, statusFilter);
  };

  // Table columns definition
  const columns = useMemo(() => [
    {
      accessorKey: 'doctorId',
      header: 'Doctor ID',
      size: 120,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          {cell.getValue()}
        </Typography>
      )
    },
    { 
      accessorKey: 'name', 
      header: 'Doctor Name', 
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
      accessorKey: 'phone', 
      header: 'Phone Number', 
      size: 150,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {cell.getValue()}
        </Typography>
      )
    },
    { 
      accessorKey: 'specialty', 
      header: 'Specialty', 
      size: 150,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          {cell.getValue()}
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
              title="Edit doctor information"
            >
              <EditIcon />
            </IconButton>
            {isActive ? (
              <IconButton 
                color="error" 
                onClick={() => handleDeleteDoctor(row.original.id)}
                title="Deactivate doctor"
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton 
                color="success" 
                onClick={() => handleReactivateDoctor(row.original.id)}
                title="Reactivate doctor"
              >
                <RefreshIcon />
              </IconButton>
            )}
          </Box>
        );
      },
    },
  ], [doctors]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Doctor Management
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Manage doctor records with HIPAA-compliant data protection. All doctor information is encrypted and securely stored.
      </Typography>

      <Paper elevation={1} sx={{ p: 3 }}>
        {/* Loading State */}
        {authLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ ml: 2 }}>
              Loading authentication...
            </Typography>
          </Box>
        )}

        {/* Error Display */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Authentication Status */}
        {!isAuthenticated && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Authentication Required:</strong> Please log in to access doctor data and manage doctor records.
            </Typography>
          </Alert>
        )}

        {/* Server Status and HIPAA Compliance Notice */}
        {!serverOnline && isAuthenticated && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Server Offline:</strong> Unable to connect to the backend server. 
              Please ensure the server is running to access doctor data.
            </Typography>
          </Alert>
        )}
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>HIPAA Compliance Notice:</strong> All doctor data is encrypted at rest and in transit. 
            Access is logged and monitored for security compliance.
            {serverOnline && isAuthenticated && <span> • Server Status: <strong style={{color: 'green'}}>Online</strong></span>}
            {isAuthenticated && user && <span> • User: <strong>{user.name || user.email}</strong></span>}
          </Typography>
        </Alert>

        {/* Search and Filter Controls */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search by name, email, phone, specialty, or ID..."
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

        {/* Add New Doctor Button and Export Menu */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {pagination.total} doctors ({statusFilter === 'All' ? 'All statuses' : statusFilter})
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
              Add New Doctor
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

        {/* Doctors Table */}
        {isAuthenticated && (
          <>
            <MaterialReactTable
              columns={columns}
              data={doctors}
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
              muiTableBodyCellProps={{
                sx: {
                  borderBottom: '1px solid',
                  borderBottomColor: 'divider'
                }
              }}
              muiTableBodyProps={{
                sx: {
                  '& .MuiTableRow-root:hover': {
                    backgroundColor: 'action.hover'
                  }
                }
              }}
              renderEmptyRowsFallback={() => (
                <Typography variant="body2" sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                  {loading ? 'Loading doctors...' : 'No doctors found. Click "Add New Doctor" to get started.'}
                </Typography>
              )}
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

      {/* The Add/Edit Doctor Modal */}
      <DoctorFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        editingDoctor={editingDoctor}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Doctors;