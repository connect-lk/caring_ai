import React, { useState } from "react";
import AssessmentInformation from "../components/assessmentReport/AssessmentInformation";
import AssessmentQuestions from "../components/assessmentReport/AssessmentQuestions";
import PostCallAnalysis from "../components/assessmentReport/PostCallAnalysis";
import ConversationTranscript from "../components/assessmentReport/ConversationTranscript";
import { Maximize2, Minimize2 } from "lucide-react";

const CognitiveAssessmentReport = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPostOpen, setIsPostOpen] = useState(true);
  return (
    <>
      <div className="   bg-gray-50 py-4 sm:py-8 lg:py-12">
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div className="flex items-center sm:block hidden">
            <span className="text-2xl font-bold text-color mr-1">caring</span>
            <span className="text-2xl font-bold text-gray-900">.ai</span>
          </div>
          <h1 className="sm:text-2xl text-lg font-semibold text-gray-900">
            Cognitive Assessment Report
          </h1>
          <p className="text-sm text-gray-600">Page 1 of 1</p>
        </div>
        <AssessmentInformation />
        <div className="flex mt-8 gap-3">
          {/* Collapse All Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              setIsPostOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-md border cursor-pointer border-gray-200 hover:bg-gray-700 transition"
          >
            <Minimize2 className="h-4 w-4" />
            <span className="text-sm font-medium">Collapse All</span>
          </button>

          {/* Expand All Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setIsPostOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-gray-600 text-white cursor-pointer rounded-md border border-gray-300 hover:bg-gray-700 transition"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="text-sm font-medium">Expand All</span>
          </button>
        </div>
      </div>
      <AssessmentQuestions isOpen={isOpen} setIsOpen={setIsOpen} />
      <PostCallAnalysis isPostOpen={isPostOpen} setIsPostOpen={setIsPostOpen} />
      <ConversationTranscript />
    </>
  );
};

export default CognitiveAssessmentReport;
