"use client"
import React, { useState } from "react";

import { TagsInput, Tag } from "@/components/atoms/TagsInput/TagsInput";
import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import { Controller } from "react-hook-form";
import { useStepThreeP2Form } from "../../hooks/useStepThreeP2StudentForm";

const StepThreeP2StudentForm = () => {
  const { handleSubmit, onSubmit, control, errors, isValid, isLoading, skillsOptions, topicsOptions } =
    useStepThreeP2Form();

  return (
    <form
      className="space-y-6 pb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SetupStepsFormHeader heading="Technical Details" />

      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.05s' }}
      >
        <Controller
          control={control}
          name="topics"
          defaultValue={[]}
          render={({ field }) => (
            <TagsInput
              label="Topics of Interest"
              placeholder="No topics added yet"
              value={field.value || []}
              suggestions={topicsOptions.length > 0 ? topicsOptions : undefined}
              onChange={(v) => field.onChange(v)}
              error={errors?.topics?.message as any}
            />
          )}
        />
      </div>

      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.1s' }}
      >
        <Controller
          control={control}
          name="skills"
          defaultValue={[]}
          render={({ field }) => (
            <TagsInput
              label="Your Skills"
              placeholder="No skills added yet"
              suggestions={skillsOptions.length > 0 ? skillsOptions : undefined}
              value={field.value || []}
              onChange={(v) => field.onChange(v)}
              error={errors?.skills?.message as any}
            />
          )}
        />
      </div>

      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.15s' }}
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
      </div>

      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.2s' }}
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
      </div>

      <SetupStepsFormBtns disabled={!isValid} loading={isLoading} backStepVal={0.1} />
    </form>
  );
};

export default StepThreeP2StudentForm;
