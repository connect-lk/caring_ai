import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Dashboard from "./pages/Dashboard";
import RequestAssessment from "./pages/RequestAssessment";
import AssessmentResults from "./pages/AssessmentResults";
import BookingQueue from "./pages/BookingQueue";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import SignupForm from "./pages/SignupForm";
import EmailVerification from "./pages/EmailVerification";
import CognitiveAssessmentReport from "./pages/CognitiveAssessmentReport";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/verify/:token" element={<EmailVerification />} />

          {/* Protected Routes (inside layout) */}
          <Route
            path="/dashboard"
            element={
              <Layout> 
                <Dashboard /> 
              </Layout>
            }
          />
          <Route
            path="/request-assessment"
            element={
              <Layout>
                <RequestAssessment />
              </Layout>
            }
          />
          <Route
            path="/assessment-results"
            element={
              <Layout>
                <AssessmentResults />
              </Layout>
            }
          />
          <Route
            path="/booking-queue"
            element={
              <Layout>
                <BookingQueue />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route
            path="/doctors"
            element={
              <Layout>
                <Doctors />
              </Layout>
            }
          />
          <Route
            path="/doctors"
            element={
              <Layout>
                <Doctors />
              </Layout>
            }
          />
          <Route
            path="/patients"
            element={
              <Layout>
                <Patients />
              </Layout>
            }
          />
          <Route
            path="/cognitive-assessment-report"
            element={
              <Layout>
                <CognitiveAssessmentReport />
              </Layout>
            }
          />

            {/* Default redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
