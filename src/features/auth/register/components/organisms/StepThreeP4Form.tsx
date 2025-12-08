import { TagsInput, Tag } from "@/components/atoms/TagsInput/TagsInput";
import { motion } from "framer-motion";
import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { BsLinkedin } from "react-icons/bs";
import { FaSquareGithub } from "react-icons/fa6";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import { Controller } from "react-hook-form";
import { useStepThreeP4Form } from "../../hooks/useStepThreeP4Form";
import { useStepThreeP4StudentForm } from "../../hooks/useStepThreeP4StudentForm";
import { useSearchParams } from "next/navigation";

const StepThreeP4Form = () => {
  const role = useSearchParams().get("role");
  
  // Use student hook if role is student, otherwise use mentor hook
  const hookResult = role === "student" ? useStepThreeP4StudentForm() : useStepThreeP4Form();
  
  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    isValid,
    isLoading,
    languagesOptions
  } = hookResult;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SetupStepsFormHeader heading="Communication Preference" className="text-center sm:text-left" />

      {/* Languages tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <TagsInput
              name="languages"
              suggestions={languagesOptions}
              label="Your Languages"
              placeholder="e.g German ,Spanish"
              value={(field.value as Tag[]) || []}
              onChange={(v) => field.onChange(v)}
            />
          )}
        />
      </motion.div>

      {/* Social inputs in bordered boxes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Linkedin Profile
            </label>
            <div className="w-full flex items-center gap-3 border border-gray-500 rounded-xs p-3 mb-4 focus-within:ring-2">
              <BsLinkedin className="text-blue-600 text-xl" />
              <OutlineTextField
                register={register}
                name="linkedinUrl"
                placeholder="linkedin/in/yourprofile"
                className="bg-transparent border-gray-500! border-1! focus:ring-none! "
                error={errors?.linkedinUrl?.message as any}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Github Profile
            </label>
            <div className="w-full flex items-center gap-3 border border-gray-500 rounded-xs p-3 mb-4 focus-within:ring-2">
              <FaSquareGithub className=" text-xl" />

              <OutlineTextField
                register={register}
                name="githubUrl"
                placeholder="github/yourusername"
                className="bg-transparent border-gray-500! border-1! focus:ring-none! "
                error={errors?.githubUrl?.message as any}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <SetupStepsFormBtns
        disabled={!isValid}
        loading={isLoading}
        backStepVal={0.1}
      />
    </form>
  );
};

export default StepThreeP4Form;
