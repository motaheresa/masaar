import { motion } from "framer-motion";

type Props = {
  heading: string;
  subHeading?: string;
  className?: string;
};

const SetupStepsFormHeader = ({ heading, subHeading,className }: Props) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={className}>
      <h2 className="text-xl font-bold text-gray-800">{heading}</h2>
      {subHeading && (
        <p className="text-sm text-gray-500 mt-1">{subHeading}</p>
      )}
    </motion.div>
  );
};

export default SetupStepsFormHeader;
