import React from "react";

const TOTAL_WIDTH = 100;
const TOTAL_STEPS = 5;
const ProgressStep = ({ step }: { step: number }) => {
  const StepString = step.toString();
  const currentStep = StepString.includes(".")
    ? StepString[StepString.length - 1]
    : step;
  const currentStepWidth = (TOTAL_WIDTH / TOTAL_STEPS) * currentStep;

  const progressBarWidth = `${currentStepWidth}%`;
  return (
    <>
      <p className="text-sm text-gray-600 mb-2">Step {currentStep} of {TOTAL_STEPS}</p>
      <div className="relative bg-primary-hover/40 w-full h-1.5 rounded-md overflow-hidden">
        <span
          style={{ width: progressBarWidth, transition: 'width 320ms ease' }}
          className={`absolute bg-primary block left-0 top-0 h-full rounded-md`}
        />
      </div>
    </>
  );
};

export default ProgressStep;
