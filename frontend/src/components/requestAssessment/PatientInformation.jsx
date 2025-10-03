// PatientInformation.jsx
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Lock, Search, ArrowRight } from "lucide-react";

const PatientInformation = ({ initialValues, validationSchema, onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState(
    initialValues.searchPatient || ""
  );
  // const [searchError, setSearchError] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // setSearchError("");
  };

  const initialStepValues = {
    patientName: initialValues.patientName,
    patientId: initialValues.patientId,
    phoneNumber: initialValues.phoneNumber,
    age: initialValues.age,
    gender: initialValues.gender,
    ethnicity: initialValues.ethnicity,
    hasCaregiver: initialValues.hasCaregiver,
  };

  const handleSubmitWrapper = (values, formikHelpers) => {
    const fullStepValues = {
      ...values,
      searchPatient: searchQuery,
    };
    onSubmit(fullStepValues, formikHelpers);
  };

  return (
    <Formik
      initialValues={initialStepValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitWrapper}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Patient Information
            </h3>
            <p className="text-gray-500 mb-6">
              Please fill in all required patient details.
            </p>
            <label
              htmlFor="searchPatient"
              className="block text-sm font-medium text-gray-700"
            >
              Search Patient <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                id="searchPatient"
                name="searchPatient"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for patient by name or ID..."
                className={`block w-full border border-gray-300   rounded-lg   p-3 pl-10  focus:outline-1 outline-gray-400 placeholder-gray-500`}
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            {/* <p className="text-gray-500 text-sm mt-1">
              Search by patient name or ID to populate form fields
            </p> */}
            {/* {searchError && (
              <div className="text-red-500 text-xs mt-1">{searchError}</div>
            )} */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="patientName"
                className="block text-sm font-medium text-gray-700"
              >
                Patient Name <span className="text-red-500">*</span>
              </label>
              <Field
                type="text"
                id="patientName"
                name="patientName"
                placeholder="Patient name"
                className="mt-1 block w-full border border-gray-300 rounded-lg   p-3 focus:outline-1 outline-gray-400 placeholder-gray-500"
              />
              <ErrorMessage
                name="patientName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="patientId"
                className="block text-sm font-medium text-gray-700"
              >
                Patient ID <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <Field
                  type="text"
                  id="patientId"
                  name="patientId"
                  placeholder="Patient ID"
                  className="block w-full border border-gray-300   rounded-lg   p-3    focus:outline-1 outline-gray-400 placeholder-gray-500"
                  // readOnly
                />
                {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500">
                  <Lock className="w-4 h-4 mr-1" /> LOCKED
                </div> */}
              </div>
              <ErrorMessage
                name="patientId"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone number"
                className="mt-1 block w-full border border-gray-300   rounded-lg   p-3    focus:outline-1 outline-gray-400 placeholder-gray-500"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age <span className="text-red-500">*</span>
              </label>
              <Field
                type="number"
                id="age"
                name="age"
                placeholder="Age"
                className="mt-1 block w-full border border-gray-300   rounded-lg   p-3   focus:outline-1 outline-gray-400 placeholder-gray-500"
              />
              <ErrorMessage
                name="age"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender (Optional)
              </label>
              <div className="relative">
                <Field
                  as="select"
                  id="gender"
                  name="gender"
                  className="mt-1 block appearance-none w-full border border-gray-300 rounded-lg p-3 focus:outline-1 outline-gray-400 placeholder-gray-500 text-black"
                >
                  <option value="" disabled className="text-gray-500">
                    Select gender
                  </option>
                  <option value="Male" className="text-black">
                    Male
                  </option>
                  <option value="Female" className="text-black">
                    Female
                  </option>
                  <option value="Other" className="text-black">
                    Other
                  </option>
                </Field>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="ethnicity"
                className="block text-sm font-medium text-gray-700"
              >
                Ethnicity (Optional)
              </label>
              <div className="relative">
                <Field
                  as="select"
                  id="ethnicity"
                  name="ethnicity"
                  className="mt-1 block appearance-none w-full border border-gray-300 rounded-lg p-3 focus:outline-1 outline-gray-400 placeholder-gray-500 text-black"
                >
                  <option value="" disabled className="text-gray-500">
                    Select ethnicity
                  </option>
                  <option className="text-black" value="Asian">Asian</option>
                  <option className="text-black" value="Caucasian">Caucasian</option>
                  <option className="text-black" value="Hispanic">Hispanic</option>
                </Field>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Does the patient have a caregiver present?
            </label>
            <div
              role="group"
              aria-labelledby="caregiver-radio-group"
              className="flex flex-col space-y-2"
            >
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="hasCaregiver"
                  value="Yes"
                  className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <Field
                  type="radio"
                  name="hasCaregiver"
                  value="No"
                  className="h-4 w-4 text-gray-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
            <ErrorMessage
              name="hasCaregiver"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 cursor-pointer font-medium flex items-center"
            >
              Continue to Assessment Details{" "}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PatientInformation;
