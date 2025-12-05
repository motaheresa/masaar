import React from "react";

type IProps = {
    header:string,
    subHeader:string
};
const SignupStepHeader = ({header,subHeader}:IProps) => {
  return (
    <div className="md:mb-8 mb-6 text-center">
      <h1 className="sm:text-3xl text-xl lg:text-4xl font-bold text-primary mb-1">
        {header}
      </h1>
      <p className="text-gray-600 text-sm lg:text-base">
        {subHeader}
      </p>
    </div>
  );
};

export default SignupStepHeader;
