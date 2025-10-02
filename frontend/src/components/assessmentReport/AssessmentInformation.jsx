import React from "react";

const assessmentInfoData = [
  [
    { label: "Patient Name", value: "Asit Deva" },
    { label: "Patient ID", value: "PAT-0006" },
  ],
  [
    { label: "Assigned Doctor", value: "John" },
    { label: "Assessment Type", value: "MoCA Screening" },
    { label: "Scheduled", value: "9/24/2025, 6:30:00 PM" },
  ],
  [
    { label: "Assessment ID", value: "CAI-167" },
    { label: "Scheduled ID", value: "68d435a1eacb9eb53bf8b7ec" },
    { label: "Call ID", value: "68d438c8eacb8eb53bf9e71c" },
  ],
];

const renderInfoItem = (label, value) => (
  <div key={label} className="flex flex-col mb-4 sm:mb-0 sm:w-1/3 min-w-0">
    <p className="text-sm font-semibold uppercase text-gray-500 tracking-wider">
      {label}
    </p>
    <p
      className={`text-base font-medium mt-1 ${
        label.includes("ID") ? "text-color" : "text-gray-900"
      }`}
    >
      {value}
    </p>
  </div>
);
const AssessmentInformation = () => {
  return (
    <div>
      {/* Assessment Information Header Bar */}
      <div className="mt-8 bg-gray-100 border-l-4 border-r-4 border-[#374151] rounded-md p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Assessment Information
        </h2>
      </div>
      <div className="bg-white p-6 sm:p-8 mt-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-y-6 sm:gap-y-12">
          {assessmentInfoData.map((rowItems, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex flex-col sm:flex-row w-full justify-between mb-4"
            >
              {rowItems.map((item) => renderInfoItem(item.label, item.value))}
              {rowIndex === 0 && (
                <div className="sm:w-1/3 hidden sm:block"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentInformation;
