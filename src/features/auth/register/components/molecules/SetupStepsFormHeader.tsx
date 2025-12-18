

type Props = {
  heading: string;
  subHeading?: string;
  className?: string;
};

const SetupStepsFormHeader = ({ heading, subHeading, className }: Props) => {
  return (
    <div className={`${className} animate-slide-up`}>
      <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
      {subHeading && (
        <p className="text-sm text-gray-500 mt-1">{subHeading}</p>
      )}
    </div>
  );
};

export default SetupStepsFormHeader;
