import { useState } from 'react';

const AssessmentResults = () => {
  const [selectedResult, setSelectedResult] = useState(null);
  const [filter, setFilter] = useState('all');

  // Mock data - in real app, this would come from API
  const results = [
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001',
      assessmentType: 'Cognitive Assessment',
      completedDate: '2024-01-15',
      score: 85,
      status: 'completed',
      priority: 'normal'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P002',
      assessmentType: 'Memory Assessment',
      completedDate: '2024-01-14',
      score: 72,
      status: 'completed',
      priority: 'high'
    },
    {
      id: 3,
      patientName: 'Bob Johnson',
      patientId: 'P003',
      assessmentType: 'Attention Assessment',
      completedDate: '2024-01-13',
      score: 91,
      status: 'completed',
      priority: 'normal'
    },
    {
      id: 4,
      patientName: 'Alice Brown',
      patientId: 'P004',
      assessmentType: 'Executive Function Assessment',
      completedDate: '2024-01-12',
      score: 68,
      status: 'completed',
      priority: 'urgent'
    }
  ];

  const filteredResults = results.filter(result => {
    if (filter === 'all') return true;
    if (filter === 'high-priority') return result.priority === 'high' || result.priority === 'urgent';
    if (filter === 'low-scores') return result.score < 75;
    return true;
  });

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Assessment Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage completed assessment results.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Results</option>
            <option value="high-priority">High Priority</option>
            <option value="low-scores">Low Scores (&lt;75)</option>
          </select>
        </div>
      </div>

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
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Completed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {result.patientName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {result.patientId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {result.assessmentType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(result.priority)}`}>
                      {result.priority.charAt(0).toUpperCase() + result.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {result.completedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedResult(result)}
                      className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-4"
                    >
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Assessment Details
              </h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Patient Name</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedResult.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Patient ID</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedResult.patientId}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assessment Type</label>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedResult.assessmentType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Score</label>
                  <p className={`text-sm font-medium ${getScoreColor(selectedResult.score)}`}>
                    {selectedResult.score}/100
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Detailed Results</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Detailed assessment results and recommendations would be displayed here.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentResults;
