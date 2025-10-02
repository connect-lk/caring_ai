import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"; 
const assessmentQuestionsData = {
  totalQuestions: 52,
  answered: 0,
  notRecorded: 52,
};

const questionsData = [
  {
    number: "G1",
    code: "question_gpcog_date_orientation",
    score: "No score",
    questionText: "Can you tell me today’s date?",
    response: "No response recorded",
    interpretation: "No interpretation recorded",
  },
  {
    number: "G2",
    code: "question_gpcog_date_orientation",
    score: "No score",
    questionText: "Can you tell me today’s date?",
    response: "No response recorded",
    interpretation: "No interpretation recorded",
  },
  {
    number: "G3",
    code: "question_gpcog_date_orientation",
    score: "No score",
    questionText: "Can you tell me today’s date?",
    response: "No response recorded",
    interpretation: "No interpretation recorded",
  },
];
const AssessmentQuestions = ({isOpen,setIsOpen}) => {
  const { totalQuestions, answered, notRecorded } = assessmentQuestionsData; 

  const renderQuestionCard = (question) => (
    <div
      key={question.number}
      className="p-6 bg-white mt-8 rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4 p-3  border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-3 rounded-full">
            {question.number}
          </span>
          <span className="text-md text-gray-600 hidden sm:inline-block">
            {question.code}
          </span>
        </div>

        <div className="bg-red-100 text-red-700 text-md font-medium px-4 py-2 rounded-md flex items-center border border-red-300">
          <AlertTriangle className="w-6 h-6 mr-2" />
          {question.score}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold uppercase text-gray-800 tracking-wider">
          QUESTION
        </p>
        <div className="bg-gray-100 border border-gray-500 text-gray-900 p-4 rounded-lg mt-2">
          <p className="text-lg font-medium">{question.questionText}</p>
        </div>
      </div>

      {renderQABox("RESPONSE", question.response)}
      {renderQABox("INTERPRETATION", question.interpretation)}
    </div>
  );

  const renderMetricCard = (label, value, colorClass) => (
    <div key={label} className="flex flex-col items-center w-full sm:w-1/3 p-4">
      <p className={`text-4xl font-bold ${colorClass}`}>{value}</p>
      <p className="text-sm font-semibold uppercase text-gray-500 mt-1 tracking-wider">
        {label}
      </p>
    </div>
  );

  const renderQABox = (label, value) => (
    <div className="mt-4">
      <p className="text-sm font-semibold uppercase text-gray-800 tracking-wider mb-2">
        {label}
      </p>
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg flex items-center">
        <AlertTriangle className="w-6 h-6 mr-3 flex-shrink-0" />
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="  ">
      <div
        className=" p-4 bg-gray-100 border-l-4 border-r-4 border-[#374151] cursor-pointer rounded-md flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          Assessment Questions
        </h2>
        {isOpen ? (
          <ChevronUp className="w-7 h-7 text-gray-600" />
        ) : (
          <ChevronDown className="w-7 h-7 text-gray-600" />
        )}
      </div>

      {isOpen && (
        <>
          <div className="bg-white   w-full   my-10    ">
            <div className="flex flex-col sm:flex-row justify-around p-6 sm:p-4 bg-white border rounded-md border-gray-200 shadow-sm">
              {renderMetricCard(
                "Total Questions",
                totalQuestions,
                "text-gray-700"
              )}
              <div className="hidden sm:block border-r border-gray-200 h-16 self-center"></div>{" "}
              {renderMetricCard("Answered", answered, "text-gray-700")}
              <div className="hidden sm:block border-r border-gray-200 h-16 self-center"></div>{" "}
              {renderMetricCard("Not Recorded", notRecorded, "text-gray-700")}
            </div>
          </div>
          {questionsData?.map(renderQuestionCard)}
        </>
      )}
    </div>
  );
};

export default AssessmentQuestions;
