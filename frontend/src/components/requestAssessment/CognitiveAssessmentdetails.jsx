import {useState} from 'react'

const CognitiveAssessmentdetails = () => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
      <div className="bg-white rounded-xl mt-6 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)]   outline-1 outline-offset-[-1px] outline-white/40 backdrop-blur-[6px] mb-8">
        <div   onClick={() => setIsExpanded(!isExpanded)}  className="p-6 cursor-pointer">
          <div className="flex items-center  justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100   rounded-lg flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-blue-600  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900  ">
                 Schedule New Cognitive Assessment
                </h2>
                <p className="text-sm text-gray-600  ">
                 Complete this multi-step form to schedule an automated cognitive assessment call for a patient
                </p>    
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100   text-gray-600  transition-colors"
              aria-label={isExpanded ? "Collapse section" : "Expand section"}
            >
              <svg
                className={`h-5 w-5 transition-transform duration-200 cursor-pointer ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div> 
        </div> 
        {isExpanded && (
          <div className="px-6 pb-6">
            <div className="bg-gray-50   rounded-lg p-4">
              <p className="text-sm text-gray-700   mb-4">
                This comprehensive form allows you to schedule AI-powered cognitive assessments with complete patient information:
              </p>
 
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700  ">
                <li>
                  <span className="font-semibold">Patient Information:</span>{" "}
                 Enter or select existing patient details with automatic ID generation

                </li>
                <li>
                  <span className="font-semibold">
                    Assessment Configuration:
                  </span>{" "}
                  Choose test type, doctor, and specific assessment parameters
                </li>
                <li>
                  <span className="font-semibold">Scheduling:</span> Select date, time, and timezone with availability validation
                </li>
                <li>
                  <span className="font-semibold">Contact Details:</span>{" "}
                   Configure phone number and language preferences for the AI call
                </li>
                <li>
                  <span className="font-semibold">Progress Tracking:</span>{" "}
             Form sections are validated step-by-step to ensure completeness
                </li>
              
              </ol>

              <p className="text-sm text-gray-700   mt-4">
               The assessment will be automatically queued and the patient will receive a call at the scheduled time.
              </p>
            </div>
          </div>
        )}
      </div>
  )
}

export default CognitiveAssessmentdetails
