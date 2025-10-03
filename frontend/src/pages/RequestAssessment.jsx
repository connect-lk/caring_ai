import CognitiveAssessmentdetails from "../components/requestAssessment/CognitiveAssessmentdetails";
import MultiStepForm from "../components/requestAssessment/MultiStepForm"; 

const RequestAssessment = () => {
  return (
    <div className="space-y-6 mt-6">
      <CognitiveAssessmentdetails />
      <MultiStepForm /> 
    </div>
  );
};

export default RequestAssessment;
