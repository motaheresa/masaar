import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { StepThreeP2StudentSchema, TStepThreeP2StudentFormData } from "../schemas/StepThreeP2StudentFormSchema";

export const useStepThreeP2Form = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid, errors, isLoading },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(StepThreeP2StudentSchema),
    defaultValues: {
      skills: [],
      learningGoals: [],
      preferredTechnologies: [],
    },
  });

  const { nextStep } = useRegisterSteps();
  const onSubmit = (data: TStepThreeP2StudentFormData) => {
    console.log("StepThreeP2StudentForm Data:", data);
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
