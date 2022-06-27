import AuthSteps from "../steps/AuthSteps";

export default function MultiStepForm({ steps, activeStep = 0 }) {
  return (
    <div className="wrapper">
      <div className="d-md-block  w-100 mb-10">
        <AuthSteps currentstep={activeStep} />
      </div>
      <div className="w-100 p-3 ">{steps[activeStep].component}</div>
    </div>
  );
}
