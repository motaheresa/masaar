"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TagsInput, Tag } from "@/components/atoms/TagsInput/TagsInput";
import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import { Controller } from "react-hook-form";
import { useStepThreeP2Form } from "../../hooks/useStepThreeP2StudentForm";

const StepThreeP2StudentForm = () => {
  const { handleSubmit, onSubmit, control, errors, isValid, isLoading } =
    useStepThreeP2Form();

  return (
    <form
      className="space-y-6 pb-10"
       onSubmit={handleSubmit(onSubmit)}
    >
        <SetupStepsFormHeader heading="Technical Details" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Controller
            control={control}
            name="skills"
            defaultValue={[]}
            render={({ field }) => (
              <TagsInput
                label="Your Skills"
                placeholder="No skills added yet"
                value={field.value || []}
                onChange={(v) => field.onChange(v)}
                error={errors?.skills?.message as any}
              />
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Controller
            control={control}
            name="learningGoals"
            defaultValue={[]}
            render={({ field }) => (
              <TagsInput
                label="Learning Goals"
                placeholder="No learning goals added yet"
                value={field.value || []}
                onChange={(v) => field.onChange(v)}
                error={errors?.learningGoals?.message as any}
              />
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Controller
            control={control}
            name="preferredTechnologies"
            defaultValue={[]}
            render={({ field }) => (
              <TagsInput
                label="Preferred technologies"
                placeholder="No preferred technologies added yet"
                value={field.value || []}
                onChange={(v) => field.onChange(v)}
                error={errors?.preferredTechnologies?.message as any}
              />
            )}
          />
        </motion.div>

        <SetupStepsFormBtns disabled={!isValid} loading={isLoading} backStepVal={0.1} />
    </form>
  );
};

export default StepThreeP2StudentForm;
