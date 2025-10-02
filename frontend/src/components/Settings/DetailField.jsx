import { ErrorMessage, Field } from "formik";

export const DetailField = ({
  label,
  name,
  isEditing,
  type = "text",
  readOnlyValue,
  mockInitialData,
}) => (
  <div className=" ">
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label}
    </label>
    {isEditing ? (
      // EDIT STATE: Editable Input Field
      <>
        <Field
          name={name}
          type={type}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-600 text-xs mt-1"
        />
      </>
    ) : (
      // VIEW STATE: Read-Only Display
      <p className="p-2 bg-white border border-gray-200 rounded-md text-gray-800 cursor-not-allowed">
        {readOnlyValue || mockInitialData[name]}
      </p>
    )}
  </div>
);
