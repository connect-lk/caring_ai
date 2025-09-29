import { Formik } from "formik";
import * as Yup from "yup";
import { Mail, Lock, XCircle, CheckCircle } from "lucide-react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import AuthBrandingFeatures from "../components/comman/AuthBrandingFeatures";

const Signup = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Login Data:", values);

    // Simulate login process
    setTimeout(() => {
      navigate("/login");
      setSubmitting(false);
      resetForm();
    }, 1000);
  };
  return (
    <div className="font-sans min-h-screen flex items-center justify-center bg-gray-50 p-0  ">
      <div className="w-full min-h-screen md:min-h-screen bg-white shadow-2xl grid md:grid-cols-2 overflow-hidden md:rounded-lg">
        <div className="flex flex-col items-center justify-center p-8 sm:p-8  lg:p-16 bg-gray-50 md:bg-white">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0px_4px_20px_10px_rgba(0,0,0,0.05)] border border-[#e2e8f0]  outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-[6px] p-8  ">
            <div className="flex flex-col items-center mb-6 w-full">
              <div className="w-14 h-14 bg-[#075985] text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                CA
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Caring AI</h3>
              <p className="text-sm text-gray-500 mb-6">
                Clinical Assessment Portal
              </p>
              <p className="text-sm text-gray-700">
                Sign up to your account to continue
              </p>
            </div>

            <Formik
              initialValues={{ name: "", email: "", password: "" }}
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
                    Username
                  </label>
                  <InputField
                    name="name"
                    type="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    touched={touched.name}
                  />
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
                    className="w-full mt-2 bg-[#075985] text-white text-md font-semibold py-3 rounded-md hover:bg-[#055a8a] cursor-pointer transition duration-300 disabled:opacity-75 disabled:cursor-not-allowed shadow-md capitalize tracking-wide"
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                  <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{" "}
                    <span
                      onClick={() => navigate("/login")}
                      className="text-[#075985] font-semibold cursor-pointer hover:underline"
                    >
                      Login
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

export default Signup;
