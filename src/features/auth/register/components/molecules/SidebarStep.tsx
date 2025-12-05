import React from "react";
import { IconType } from "react-icons/lib";

type IProps = {
  currentStep: number;
  progressStepVal: number;
  text: string;
  Icon: IconType;
};
const SidebarSteps = ({ currentStep, progressStepVal, text,Icon }: IProps) => {
  return (
    <>
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
          currentStep >= progressStepVal
            ? "md:bg-white md:text-primary bg-primary md:border-white border-none text-white shadow-lg"
            : "md:bg-teal-400/30 border-primary md:border-white/50 md:text-white text-primary"
        }`}
      >
        <Icon className="w-6 h-6" strokeWidth={2.5} />
      </div>
      <div className="flex-1 pt-1 md:block hidden">
        {progressStepVal&&<p
          className={`font-semibold text-sm mb-1 transition-colors ${
            currentStep >= progressStepVal ? "text-white" : "text-white/70"
          }`}
        >
          Step {progressStepVal}
        </p>}
        {text && (
          <p
            className={`text-base font-medium transition-colors ${
              currentStep >= progressStepVal ? "text-white" : "text-white/60"
            }`}
          >
            {text}
          </p>
        )}
      </div>
    </>
  );
};

export default SidebarSteps;
