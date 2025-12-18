"use client";
import React from "react";

import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import { useStepThreeP3Form } from "../../hooks/useStepThreeP3Form";
// atoms
import ImageUpload from "@/components/atoms/ImageUpload/ImageUpload";
import TimeInput from "@/components/atoms/TimeInput/TimeInput";

const StepThreeP3Form = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    setValue,
    watch,
    errors,
    isValid,
    isLoading,
  } = useStepThreeP3Form();

  const avatarPreview = watch("avatar");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <SetupStepsFormHeader heading="Availability Details" className="text-center sm:text-left" />

      {/* Profile Photo Upload */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.05s' }}
      >
        <ImageUpload
          label="Profile Photo"
          helperText="Drag & Drop or click to upload your photo. To help mentors you effectively"
          value={avatarPreview}
          onChange={(dataUrl) =>
            setValue("avatar", dataUrl ?? "", {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        />
      </div>

      {/* Available Hours */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.12s' }}
      >
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Your Available Hours
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TimeInput label="Start Time" name="startTime" register={register} />
          <TimeInput label="End Time" name="endTime" register={register} />
        </div>
      </div>

      {/* Preferred Project Difficulty */}
      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.18s' }}
      >
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Preferred Project Difficulty
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {[
            { value: "EASY", label: "Easy" },
            { value: "MEDIUM", label: "Medium" },
            { value: "HARD", label: "Hard" },
          ].map((opt) => {
            const selected = watch("preferredDifficulty") === opt.value;
            return (
              <label
                key={opt.value}
                className={`w-full sm:flex-1 border rounded-md p-3 cursor-pointer ${selected
                  ? "ring-2 ring-primary border-primary"
                  : "border-gray-200"
                  }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <input
                    type="radio"
                    value={opt.value}
                    {...register("preferredDifficulty")}
                    className={`form-radio h-4 w-4 ${selected ? "text-primary" : "text-gray-400"
                      } ${errors.preferredDifficulty ? "border-red-500" : ""}`}

                    aria-hidden={false}
                  />
                  <div className="text-sm font-medium">{opt.label}</div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      <SetupStepsFormBtns
        disabled={!isValid}
        loading={isLoading}
        backStepVal={0.1}
      />
    </form>
  );
};

export default StepThreeP3Form;
