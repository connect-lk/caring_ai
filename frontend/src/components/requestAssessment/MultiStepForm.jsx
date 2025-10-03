// MultiStepForm.jsx
import React, { useState } from "react";
import { Check } from "lucide-react";
import * as Yup from "yup";

// Import all step components
import PatientInformation from "./PatientInformation";
import Assessment from "./Assessment";
import Scheduling from "./Scheduling";
import Consent from "./Consent";

// --- Initial State and Validation Schemas ---

const initialValues = {
  // --- Step 1: Patient Info ---
  patientName: "",
  patientId: "",
  phoneNumber: "",
  age: "",
  gender: "",
  ethnicity: "",
  hasCaregiver: "No",

  // --- Step 2: Assessment ---
  assessmentType: "",
  assigningPhysician: "",
  communicationNotes: "",

  // --- Step 3: Scheduling ---
  assessmentDate: "",
  timezone: "Eastern Time (ET)",
  timeHour: "09",
  timeMinute: "00",
  timeAmPm: "AM",

  // --- Step 4: Consent ---
  consentAccepted: false,
};

// Define Validation Schemas for each step
const patientInfoSchema = Yup.object().shape({
  patientName: Yup.string().required("Patient Name is required"),
  patientId: Yup.string().required("Patient ID is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be valid"),
  hasCaregiver: Yup.string().oneOf(["Yes", "No"]).required(),
});

const assessmentSchema = Yup.object().shape({
  assessmentType: Yup.string().required("Assessment type is required"),
  assigningPhysician: Yup.string().required("Assigning physician is required"),
  communicationNotes: Yup.string().max(
    750,
    "Notes cannot exceed 750 characters."
  ),
});

const schedulingSchema = Yup.object().shape({
  assessmentDate: Yup.string()
    .required("Assessment Date is required")
    .nullable(),
  timezone: Yup.string().required("Timezone is required"),
  timeHour: Yup.string().required("Hour is required"),
  timeMinute: Yup.string().required("Minute is required"),
  timeAmPm: Yup.string().required("AM/PM is required"),
});

const consentSchema = Yup.object().shape({
  consentAccepted: Yup.boolean().oneOf(
    [true],
    "Consent must be accepted to proceed and submit the form."
  ),
});

const validationSchemas = {
  1: patientInfoSchema,
  2: assessmentSchema,
  3: schedulingSchema,
  4: consentSchema,
};

// --- MultiStepForm Component ---

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialValues);

  const steps = ["Patient Info", "Assessment", "Scheduling", "Consent"];

  // Function to handle moving to the next step
  const nextStep = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));
    setStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    // Only decrement step, keeping form data for back navigation
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Final submission logic
  const handleSubmit = (values) => {
    setFormData((prev) => ({ ...prev, ...values }));

    const finalData = { ...formData, ...values };
    console.log("Final Form Submission Data:", finalData);
    alert("Form Submitted! Check console for data.");
  };

  const getStepContent = () => {
    const commonProps = {
      initialValues: formData,
      validationSchema: validationSchemas[step],
      onSubmit: step === steps.length ? handleSubmit : nextStep,
      prevStep: prevStep,
      step: step,
    };

    switch (step) {
      case 1:
        return <PatientInformation {...commonProps} />;
      case 2:
        return <Assessment {...commonProps} />;
      case 3:
        return <Scheduling {...commonProps} />;
      case 4:
        return <Consent {...commonProps} />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Patient Assessment Request Form
      </h2>
      <p className="text-gray-500 mb-8">
        Complete each section step by step. Fields marked with{" "}
        <span className="text-red-500 font-normal">*</span> are required.
      </p>

      {/* --- Step Indicator --- */}
      <div className="relative flex items-center justify-between mb-16">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-gray-500 -translate-y-1/2 transition-all duration-300"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>
        {steps?.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = step > stepNumber;
          const isActive = step === stepNumber;

          return (
            <div
              key={stepNumber}
              className="flex flex-col items-center relative z-10 w-1/4 mt-6"
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-gray-500 border-gray-500 text-white"
                      : isActive
                      ? "border-gray-500 text-gray-500 bg-white font-medium"
                      : "border-gray-300 text-gray-500 bg-white"
                  }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 stroke-[3px]" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-2 text-sm text-center ${
                  isActive
                    ? "text-gray-600 font-normal"
                    : isCompleted
                    ? "text-gray-900 font-normal"
                    : "text-gray-500 font-normal"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ---- Step Forms ---- */}
      <div className="my-6">{getStepContent()}</div>
    </div>
  );
};

export default MultiStepForm;
