import React from "react";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { TagsInput } from "@/components/atoms/TagsInput/TagsInput";
import { SelectBox } from "@/components/atoms/Select/SelectBox";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import { useStepThreeP2MentorForm } from "../../hooks/useStepThreeP2MentorForm";

const StepThreeP2MentorForm = () => {
  const { handleSubmit, onSubmit, control, register, errors, isValid, isLoading,skillsOptions } =
    useStepThreeP2MentorForm();

  const yearsOptions = [
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5+" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SetupStepsFormHeader heading="Technical Details" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Controller
          control={control}
          name="jobTitle"
          render={({ field }) => (
            <TagsInput
              label="Job Title"
              placeholder="e.g. Front-End Developer"
              value={field.value || []}
              onChange={(v) => field.onChange(v)}
              error={errors?.jobTitle?.message as any}
            />
          )}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <SelectBox
          label="Years of Experience"
          placeholder="e.g. 4"
          name="yearsOfExperience"
          register={register}
          options={yearsOptions}
          error={errors?.yearsOfExperience?.message}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Controller
          control={control}
          name="skills"
          render={({ field }) => (
            <TagsInput
              label="Your Skills"
              placeholder="e.g. JavaScript, CSS"
              name="skills"
              suggestions={skillsOptions}
              value={field.value || []}
              onChange={(v) => field.onChange(v)}
              error={errors?.skills?.message as any}
            />
          )}
        />
      </motion.div>

      <SetupStepsFormBtns disabled={!isValid} loading={isLoading} backStepVal={0.1} />
    </form>
  );
};

export default StepThreeP2MentorForm;