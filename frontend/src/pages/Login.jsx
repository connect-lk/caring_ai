import { Formik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, AlertCircle } from "lucide-react";
import InputField from "../components/InputField";
import { useNavigate, useLocation } from "react-router-dom";
import AuthBrandingFeatures from "../components/comman/AuthBrandingFeatures";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError } = useAuth();
  const [loginError, setLoginError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoginError("");
      clearError();
      
      const result = await login(values);
      
      if (result.success) {
        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
        resetForm();
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-50 p-0  ">
      <div className="w-full min-h-screen md:min-h-screen bg-white shadow-2xl grid md:grid-cols-2 overflow-hidden md:rounded-lg">
        <div className="flex flex-col items-center justify-center  p-8 sm:p-8 lg:p-16 bg-gray-50 md:bg-white">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0px_4px_20px_10px_rgba(0,0,0,0.05)] border border-[#e2e8f0]  outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-[6px] p-8 ">
            <div className="flex flex-col items-center mb-6 w-full">
              <div className="w-14 h-14 bg-color text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                CA
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Caring AI</h3>
              <p className="text-sm text-gray-500 mb-6">
                Clinical Assessment Portal
              </p>
              <p className="text-sm text-gray-700">
                Sign in to your account to continue
              </p>
            </div>

            {/* Error Display */}
            {(error || loginError) && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-700">{error || loginError}</p>
                </div>
              </div>
            )}

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="space-y-2 pt-4">
                  {/* Username Field */}
                  <label className="block text-sm font-semibold text-gray-800">
                    Email
                  </label>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    icon={Mail}
                  />

                  {/* Password Field */}
                  <label className="block text-sm font-semibold text-gray-800  ">
                    Password
                  </label>
                  <InputField
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password}
                    touched={touched.password}
                    icon={Lock}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-color text-white text-md font-semibold py-3 rounded-md bg-hover cursor-pointer transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed shadow-md capitalize tracking-wide"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Don’t have an account?{" "}
                    <span
                      onClick={() => navigate("/signup")}
                      className="text-color font-semibold cursor-pointer hover:underline"
                    >
                      Sign Up
                    </span>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
        <AuthBrandingFeatures />
      </div>
    </div>
  );
};

export default Login;
