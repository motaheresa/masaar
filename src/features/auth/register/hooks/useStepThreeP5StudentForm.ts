import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { StepThreeP5StudentSchema, TStepThreeP5StudentFormData,  } from "../schemas/StepThreeP5StudentFormSchema";

export const useStepThreeP5StudentForm = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid, errors, isLoading },
  } = useForm<TStepThreeP5StudentFormData>({
    mode: "onChange",
    resolver: zodResolver(StepThreeP5StudentSchema),
    defaultValues: {
      topics: ["UI/UX Design", "Mobile Development"],
      learningPreference: "casual",
    },
  });

  const { nextStep } = useRegisterSteps();
  const onSubmit = (data: TStepThreeP5StudentFormData) => {
    console.log("Step 3.5 Personalize Data:", data);
    nextStep(0.1);
  };

  return {
    register,
    control,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isLoading,
    isValid,
  };
};

export default useStepThreeP5StudentForm;
