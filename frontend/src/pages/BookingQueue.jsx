import { useState } from 'react';

const BookingQueue = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('scheduledDate');

  // Mock data - in real app, this would come from API
  const bookings = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001',
      assessmentType: 'Cognitive Assessment',
      scheduledDate: '2024-01-20T10:00:00',
      priority: 'high',
      status: 'scheduled',
      notes: 'Patient has memory concerns'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P002',
      assessmentType: 'Memory Assessment',
      scheduledDate: '2024-01-20T14:30:00',
      priority: 'normal',
      status: 'scheduled',
      notes: 'Follow-up assessment'
    },
    {
      id: 3,
      patientName: 'Bob Johnson',
      patientId: 'P003',
      assessmentType: 'Attention Assessment',
      scheduledDate: '2024-01-21T09:15:00',
      priority: 'urgent',
      status: 'scheduled',
      notes: 'Urgent evaluation needed'
    },
    {
      id: 4,
      patientName: 'Alice Brown',
      patientId: 'P004',
      assessmentType: 'Executive Function Assessment',
      scheduledDate: '2024-01-21T11:00:00',
      priority: 'normal',
      status: 'in-progress',
      notes: 'Currently being assessed'
    },
    {
      id: 5,
      patientName: 'Charlie Wilson',
      patientId: 'P005',
      assessmentType: 'Cognitive Assessment',
      scheduledDate: '2024-01-22T13:45:00',
      priority: 'low',
      status: 'scheduled',
      notes: 'Routine assessment'
    }
  ];

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'scheduled') return booking.status === 'scheduled';
    if (filter === 'in-progress') return booking.status === 'in-progress';
    if (filter === 'high-priority') return booking.priority === 'high' || booking.priority === 'urgent';
    return true;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'scheduledDate') {
      return new Date(a.scheduledDate) - new Date(b.scheduledDate);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleStartAssessment = (bookingId) => {
    alert(`Starting assessment for booking ID: ${bookingId}`);
  };

  const handleReschedule = (bookingId) => {
    alert(`Rescheduling booking ID: ${bookingId}`);
  };

  const handleCancel = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert(`Cancelled booking ID: ${bookingId}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Booking Queue
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage scheduled assessments and appointments.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Bookings</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="high-priority">High Priority</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="scheduledDate">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.status === 'in-progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {bookings.filter(b => b.priority === 'high' || b.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed Today</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Assessment Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Scheduled Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.patientName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {booking.patientId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {booking.assessmentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatDateTime(booking.scheduledDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(booking.priority)}`}>
                      {booking.priority.charAt(0).toUpperCase() + booking.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {booking.status === 'scheduled' && (
                      <button
                        onClick={() => handleStartAssessment(booking.id)}
                        className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
                      >
                        Start
                      </button>
                    )}
                    <button
                      onClick={() => handleReschedule(booking.id)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingQueue;
