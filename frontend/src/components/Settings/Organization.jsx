// src/OrganizationDetails.jsx

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DetailField } from "./DetailField";
import {mockInitialData} from '../../components/Dynamic.js'
// src/validationSchema.js
import * as Yup from "yup";

  const OrganizationSchema = Yup.object().shape({
  // --- Organization Details ---
  organizationName: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(100, "Must be 100 characters or less")
    .required("Organization Name is required"),

  emailAddress: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9\-()\s]*$/, "Invalid phone number format")
    .nullable(),

  address: Yup.string()
    .max(250, "Address is too long")
    .required("Address is required"),

  // --- Contract Information ---
  contractStartDate: Yup.date().required("Start Date is required"),

  contractEndDate: Yup.date()
    .min(Yup.ref("contractStartDate"), "End Date can't be before Start Date")
    .required("End Date is required"),

  // --- Contact Person ---
  contactPersonName: Yup.string().required("Contact Person Name is required"),
  contactPersonEmail: Yup.string()
    .email("Invalid email format")
    .required("Contact Person Email is required"),
  contactPersonPhone: Yup.string()
    .matches(/^[0-9\-()\s]*$/, "Invalid phone number format")
    .nullable(),

  // --- Super Admin ---
  superAdminName: Yup.string().required("Super Admin Name is required"),
  superAdminEmail: Yup.string()
    .email("Invalid email format")
    .required("Super Admin Email is required"),
  superAdminPhone: Yup.string()
    .matches(/^[0-9\-()\s]*$/, "Invalid phone number format")
    .nullable(),
});

const OrganizationDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState(mockInitialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = (resetForm) => {
    resetForm(currentData);
    setIsEditing(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    console.log("Submitting updated organization data:", values);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setCurrentData(values);
    setSubmitting(false);
    setIsEditing(false);
    setIsLoading(false);

    alert("Organization details saved successfully!");
  };

  return (
    <div className=" w-full ">
      <div className="">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Organization Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage your organization's information, including contact details and
          contract information.
        </p>
      </div>

      <Formik
        initialValues={currentData}
        validationSchema={OrganizationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting, isValid, dirty, resetForm }) => (
          <Form>
            {/* --- HEADER/ACTION BUTTONS --- */}
            <div className="flex justify-end mb-6 gap-3">
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 cursor-pointer transition duration-150"
                >
                  Edit Details
                </button>
              )}

              {isEditing && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCancelClick(resetForm)}
                    className="px-6 py-2 text-gray-600   font-medium rounded-lg cursor-pointer shadow-sm border border-gray-300 transition duration-150"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-2 font-medium rounded-lg shadow-md transition duration-150 
                                            ${
                                              !isValid ||
                                              !dirty ||
                                              isSubmitting ||
                                              isLoading
                                                ? "px-6 py-2 bg-gray-600 text-white font-medium rounded-lg cursor-pointer shadow-md hover:bg-gray-700 transition duration-150"
                                                : "px-6 py-2 bg-gray-600 text-white font-medium rounded-lg cursor-pointer shadow-md hover:bg-gray-700 transition duration-150"
                                            }`}
                    disabled={!isValid || !dirty || isSubmitting || isLoading}
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
            </div>

            {/* --- FORM SECTIONS --- */}

            <div className="form-section border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-l-2 border-gray-500 pl-3">
                Organization Details
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                <DetailField
                  label="Organization Name"
                  name="organizationName"
                  isEditing={isEditing}
                  readOnlyValue={currentData.organizationName}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Email Address"
                  name="emailAddress"
                  isEditing={isEditing}
                  readOnlyValue={currentData.emailAddress}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Phone Number"
                  name="phoneNumber"
                  isEditing={isEditing}
                  readOnlyValue={currentData.phoneNumber}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Address"
                  name="address"
                  isEditing={isEditing}
                  readOnlyValue={currentData.address}
                  mockInitialData={mockInitialData}
                />
              </div>
            </div>

            <div className="form-section border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-l-2 border-gray-500 pl-3">
                Contract Information
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                <DetailField
                  label="Contract Start Date"
                  name="contractStartDate"
                  type="date"
                  isEditing={isEditing}
                  readOnlyValue={currentData.contractStartDate}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Contract End Date"
                  name="contractEndDate"
                  type="date"
                  isEditing={isEditing}
                  readOnlyValue={currentData.contractEndDate}
                  mockInitialData={mockInitialData}
                />
              </div>
            </div>
            <div className="form-section border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-l-2 border-gray-500 pl-3">
                Contact Person Details
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                <DetailField
                  label="Contact Person Name"
                  name="contactPersonName"
                  isEditing={isEditing}
                  readOnlyValue={currentData.contactPersonName}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Contact Person Email"
                  name="contactPersonEmail"
                  isEditing={isEditing}
                  readOnlyValue={currentData.contactPersonEmail}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Contact Person Phone"
                  name="contactPersonPhone"
                  isEditing={isEditing}
                  readOnlyValue={currentData.contactPersonPhone}
                  mockInitialData={mockInitialData}
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-l-2 border-gray-500 pl-3">
                Super Admin Details
              </h2>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
                <DetailField
                  label="Super Admin Name"
                  name="superAdminName"
                  isEditing={isEditing}
                  readOnlyValue={currentData.superAdminName}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Super Admin Email"
                  name="superAdminEmail"
                  isEditing={isEditing}
                  readOnlyValue={currentData.superAdminEmail}
                  mockInitialData={mockInitialData}
                />
                <DetailField
                  label="Super Admin Phone"
                  name="superAdminPhone"
                  isEditing={isEditing}
                  readOnlyValue={currentData.superAdminPhone}
                  mockInitialData={mockInitialData}
                />
              </div>
            </div>

            {/* RENDER SAVE BUTTONS AT THE BOTTOM FOR LONG FORMS */}
            {isEditing && (
              <div className="flex justify-end pt-4 my-4 border-t border-gray-200 gap-3">
                <button
                  type="button"
                  onClick={() => handleCancelClick(resetForm)}
                  className="px-6 py-2 text-gray-600   font-medium rounded-lg cursor-pointer shadow-sm border border-gray-300 transition duration-150"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 font-medium rounded-lg shadow-md transition duration-150 
                                            ${
                                              !isValid ||
                                              !dirty ||
                                              isSubmitting ||
                                              isLoading
                                                ? "px-6 py-2 bg-gray-600 text-white font-medium rounded-lg cursor-pointer shadow-md hover:bg-gray-700 transition duration-150"
                                                : "px-6 py-2 bg-gray-600 text-white font-medium rounded-lg cursor-pointer shadow-md hover:bg-gray-700 transition duration-150"
                                            }`}
                  disabled={!isValid || !dirty || isSubmitting || isLoading}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrganizationDetails;
