import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import RequestAssessment from "./pages/RequestAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import BookingQueue from "./pages/BookingQueue";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignupForm from "./pages/SignupForm";
import HIPAACompliance from "./components/HIPAACompliance";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "request-assessment":
        return <RequestAssessment />;
      case "assessment-results":
        return <AssessmentResults />;
      case "booking-queue":
        return <BookingQueue />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <div className="pt-8">
              <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
                {renderPage()}
              </Layout>
            </div>
          } />
          
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
  