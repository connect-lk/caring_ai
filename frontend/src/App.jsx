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
                <ProtectedRoute>
                  <Layout> 
                    <Dashboard /> 
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-assessment"
              element={
                <ProtectedRoute>
                  <Layout>
                    <RequestAssessment />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/assessment-results"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AssessmentResults />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking-queue"
              element={
                <ProtectedRoute>
                  <Layout>
                    <BookingQueue />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cognitive-assessment-report"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CognitiveAssessmentReport />
                  </Layout>
                </ProtectedRoute>
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
