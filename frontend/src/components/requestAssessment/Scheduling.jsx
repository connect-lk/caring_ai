// Scheduling.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

// List of timezones based on your image
const timezones = [
  "Eastern Time (ET)",
  "Central Time (CT)",
  "Mountain Time (MT)",
  "Pacific Time (PT)",
  "Arizona Time (MST)",
  "Alaska Time (AKT)",
  "Hawaii Time (HST)",
];

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0")
); // 01 to 12
const minutes = ["00", "15", "30", "45"];

const Scheduling = ({
  initialValues,
  validationSchema,
  onSubmit,
  prevStep,
}) => {
  const initialStepValues = {
    assessmentDate: initialValues.assessmentDate || "",
    timezone: initialValues.timezone || "Eastern Time (ET)",
    timeHour: initialValues.timeHour || "09",
    timeMinute: initialValues.timeMinute || "00",
    timeAmPm: initialValues.timeAmPm || "AM",
  };

  return (
    <Formik
      initialValues={initialStepValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting, values, errors, touched }) => {
        const isDateSelected = !!values.assessmentDate;

        const selectedTimeDisplay =
          isDateSelected &&
          values.timeHour &&
          values.timeMinute &&
          values.timeAmPm &&
          values.timezone ? (
            <p className="text-gray-600 text-sm mt-3">
              Selected:{" "}
              <span className="font-semibold">
                {values.timeHour}:{values.timeMinute} {values.timeAmPm} (
                {values.timezone})
              </span>
            </p>
          ) : null;

        return (
          <Form>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {" "}
                Schedule Assessment
              </h3>
              <p className="text-gray-500 mb-6">
                Choose when the assessment call should be made.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assessment Date */}
                <div>
                  <label
                    htmlFor="assessmentDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assessment Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <Field
                      type="date"
                      id="assessmentDate"
                      name="assessmentDate"
                  className="mt-1 block w-full border border-gray-300   rounded-lg   p-3   focus:outline-1 outline-gray-400 placeholder-gray-500"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                  <ErrorMessage
                    name="assessmentDate"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Timezone */}
                <div className="relative">
                  <label
                    htmlFor="timezone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assessment Time ( Timezone ){" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Field
                      as="select"
                      id="timezone"
                      name="timezone"
                      className="mt-1 block appearance-none w-full border border-gray-300 rounded-lg p-3 focus:outline-1 outline-gray-400 placeholder-gray-500 text-black"
                    >
                      {timezones.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
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
                  <ErrorMessage
                    name="timezone"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Time Hour/Minute/AM/PM (Conditional) */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="timeHour"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-3 mt-1">
                    {/* Hour */}
                    <div className="w-1/3">
                      <label
                        htmlFor="timeHour"
                        className="text-xs text-gray-500 block mb-1"
                      >
                        Hour
                      </label>
                      <Field
                        as="select"
                        id="timeHour"
                        name="timeHour"
                        disabled={!isDateSelected}
                        className={`block border border-gray-300 rounded-lg p-3 focus:outline-1 outline-gray-400 w-full placeholder-gray-500 text-black appearance-none ${
                          !isDateSelected
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {hours.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {/* Minute */}
                    <div className="w-1/3">
                      <label
                        htmlFor="timeMinute"
                        className="text-xs text-gray-500 block mb-1"
                      >
                        Minute
                      </label>
                      <Field
                        as="select"
                        id="timeMinute"
                        name="timeMinute"
                        disabled={!isDateSelected}
                        className={`block border border-gray-300 rounded-lg p-3 focus:outline-1 outline-gray-400 placeholder-gray-500 text-black w-full appearance-none ${
                          !isDateSelected
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {minutes.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {/* AM/PM */}
                    <div className="w-1/3">
                      <label
                        htmlFor="timeAmPm"
                        className="text-xs text-gray-500 block mb-1"
                      >
                        AM/PM
                      </label>
                      <Field
                        as="select"
                        id="timeAmPm"
                        name="timeAmPm"
                        disabled={!isDateSelected}
                        className={`block border border-gray-300 rounded-lg p-3 focus:outline-1 outline-gray-400 placeholder-gray-500 text-black w-full appearance-none ${
                          !isDateSelected
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </Field>
                    </div>
                  </div>

                  {/* Conditional Error Messages */}
                  {!isDateSelected && (
                    <div className="text-red-500 text-xs mt-1">
                      Please select an Assessment Date first.
                    </div>
                  )}
                  {/* Show time error only if date is selected */}
                  {errors.timeHour && touched.timeHour && isDateSelected && (
                    <div className="text-red-500 text-xs mt-1">
                      Please select a time.
                    </div>
                  )}

                  {selectedTimeDisplay}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-2 text-gray-600 font-medium rounded-lg cursor-pointer border border-gray-300 transition duration-150 flex items-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Back to Assessment
                  Details
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !isDateSelected ||
                    (isDateSelected && !values.timeHour)
                  }
                  className="px-6 py-2.5 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 cursor-pointer font-medium flex items-center disabled:opacity-50"
                >
                  Continue to Consent <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Scheduling;
