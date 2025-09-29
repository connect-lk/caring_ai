import { useState } from "react";
import DashboardOverview from "../components/DashboardOverview";
import ActionCard from "../components/ActionCard";
import StatCard from "../components/StatCard";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleNewAssessment = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("New assessment request created successfully!");
    }, 1000);
  };

  const handleViewResults = () => {
    alert("Redirecting to assessment results...");
  };

  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: "Scheduled Calls",
      value: "38",
      subtitle: "Total calls in queue",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      title: "Completed",
      value: "0",
      subtitle: "Total completed assessments",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Unread",
      value: "14",
      subtitle: "Results pending review",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Median Score",
      value: "N/A",
      subtitle: "50th percentile score",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Starred",
      value: "0",
      subtitle: "Assessments marked with star",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
    },
    {
      title: "Snoozed",
      value: "0",
      subtitle: "Assessments marked as snoozed",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      title: "Manual Check",
      value: "0",
      subtitle: "Requires manual verification",
      icon: (
        <svg
          className="h-6 w-6 text-primary-600 dark:text-primary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <DashboardOverview />

      {/* Key Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActionCard
          title="Queue Assessment"
          subtitle="Schedule"
          description="Queue a new cognitive assessment call"
          buttonText={isLoading ? "Creating..." : "New Assessment"}
          onButtonClick={handleNewAssessment}
          icon={
            <svg
              className="h-6 w-6 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        />
        <ActionCard
          title="Assessment Results"
          subtitle="Results"
          description="View completed assessment results"
          buttonText="View Results"
          onButtonClick={handleViewResults}
          icon={
            <svg
              className="h-6 w-6 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20  rounded-xl shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-[6px] p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to CaringAI
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Your secure, HIPAA-compliant cognitive assessment platform. Monitor
            patient assessments, review results, and manage your healthcare
            workflow with confidence. All data is encrypted and processed
            according to the highest security standards.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
              Get Started
            </button>
            <button className="border border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium py-2 px-6 rounded-lg transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
