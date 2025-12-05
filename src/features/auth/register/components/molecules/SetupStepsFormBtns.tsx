import { Button } from "@/components/atoms/Button/Button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";

type SetupStepsFormBtnsProps = {
  onBack?: () => void;
  onContinue?: () => void; // optional, when provided will be used instead of form submit
  continueIsSubmit?: boolean; // when true, continue button will be type="submit" (default true)
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  backStepVal?: number; // step value to go back, default is 1
};

const SetupStepsFormBtns = ({
  onBack,
  onContinue,
  continueIsSubmit = true,
  disabled = false,
  loading = false,
  className = "",
  backStepVal = 1,
}: SetupStepsFormBtnsProps) => {
  const { prevStep } = useRegisterSteps();

  const handleBack = () => {
    if (onBack) return onBack();
    prevStep(backStepVal || 1);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 ${className}`}>
      <div className="w-full sm:w-1/3">
        <Button
          Icon={FaArrowLeft}
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleBack}
        >
          Back
        </Button>
      </div>

      <div className="w-full sm:w-2/3">
        <Button
          variant="primary"
          className="w-full flex items-center justify-center gap-2"
          type={continueIsSubmit ? "submit" : "button"}
          onClick={onContinue}
          disabled={disabled || loading}
          loading={loading}
        >
          {continueIsSubmit ? "Continue" : "Continue"}
          <FaArrowRight className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default SetupStepsFormBtns;
