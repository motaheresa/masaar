"use client";
import React from "react";
import { motion } from "framer-motion";
import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { SelectBox } from "@/components/atoms/Select/SelectBox";
import { useStepThreeP1Form } from "../../hooks/useStepThreeP1Form";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";

const StepThreeP1Form = () => {
  const { handleSubmit, onSubmit, register, errors, isValid, isLoading } =
    useStepThreeP1Form();
  const educationLevelOptions = [
    { value: "HIGH_SCHOOL", label: "High School" },
    { value: "UNDERGRADUATE", label: "Under Graduate" },
    { value: "GRADUATE", label: "Graduate" },
    { value: "DOCTORATE", label: "Doctorate" },
    { value: "BOOTCAMP", label: "Bootcamp" },
    { value: "SELF_TAUGHT", label: "Self Taught" },
  ];
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SetupStepsFormHeader heading="Education Details" className="text-center sm:text-left" />
      {/* Education Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <SelectBox
          label="Education Level"
          placeholder="Select your education level"
          name="educationLevel"
          register={register}
          error={errors.educationLevel?.message}
          isRequired={true}
          options={educationLevelOptions}
        />
      </motion.div>

      {/* University and Major - side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <OutlineTextField
            label="University or Institute"
            placeholder="e.g. Cairo University"
            name="university"
            register={register}
            error={errors.university?.message}
            isRequired={true}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
        >
          <OutlineTextField
            label="Major"
            placeholder="e.g. Computer Science"
            name="major"
            register={register}
            error={errors.major?.message}
            isRequired={true}
          />
        </motion.div>
      </div>

      {/* Current Year of Study */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <OutlineTextField
          label="Current Year of Study"
          placeholder="e.g. Third Year"
          name="currentYear"
          register={register}
          error={errors.currentYear?.message}
          isRequired={true}
        />
      </motion.div>

      <SetupStepsFormBtns disabled={!isValid} loading={isLoading} backStepVal={1.1} />
    </form>
  );
};

export default StepThreeP1Form;
