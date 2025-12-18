"use client";
import React from "react";

import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import SetupStepsFormBtns from "../molecules/SetupStepsFormBtns";
import useStepThreeP5StudentForm from "../../hooks/useStepThreeP5StudentForm";

const TOPICS = [
  "Javascript",
  "UI/UX Design",
  "Data Science",
  "Mobile Development",
  "Cybersecurity",
  "Machine Learning",
];

const StepThreeP5StudentForm: React.FC = () => {
  const { register, watch, setValue, handleSubmit, onSubmit, isValid, isLoading } =
    useStepThreeP5StudentForm();

  const topics = watch("topics") || [];
  const learning = watch("learningPreference");

  const toggleTopic = (t: string) => {
    const current = new Set(topics || []);
    if (current.has(t)) current.delete(t);
    else current.add(t);
    setValue("topics", Array.from(current), { shouldDirty: true, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
      <SetupStepsFormHeader heading="Personalize Experience" />

      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.05s' }}
      >
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          What Topics are you interested in ?
        </label>

        <div className="flex flex-wrap gap-3">
          {TOPICS.map((t) => {
            const selected = (topics || []).includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTopic(t)}
                className={`px-5 py-2 rounded-full border transition-all text-sm ${selected
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-800 border-gray-300"
                  }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="animate-slide-up"
        style={{ animationDelay: '0.1s' }}
      >
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          How do you prefer to learn ?
        </label>

        <div className="space-y-3">
          <label
            className={`tile-radio block border rounded-md p-4 cursor-pointer transition-all ${learning === "pair" ? "ring-2 ring-primary border-primary" : "border-gray-200"
              }`}
          >
            <div className="flex items-start gap-3">
              <input
                {...register("learningPreference")}
                type="radio"
                value="pair"
                className="form-radio h-4 w-4 flex-shrink-0 mt-0.5"
                checked={learning === "pair"}
                onChange={() => setValue("learningPreference", "pair", { shouldValidate: true, shouldDirty: true })}
              />
              <div>
                <div className="font-medium text-sm text-gray-900">Hands-on pair programming</div>
                <div className="text-sm text-gray-500 mt-1">Informal Conversations with AI and make assignments</div>
              </div>
            </div>
          </label>

          <label
            className={`tile-radio block border rounded-md p-4 cursor-pointer transition-all ${learning === "casual" ? "ring-2 ring-primary border-primary" : "border-gray-200"
              }`}
          >
            <div className="flex items-start gap-3">
              <input
                {...register("learningPreference")}
                type="radio"
                value="casual"
                className="form-radio h-4 w-4 flex-shrink-0 mt-0.5"
                checked={learning === "casual"}
                onChange={() => setValue("learningPreference", "casual", { shouldValidate: true, shouldDirty: true })}
              />
              <div>
                <div className="font-medium text-sm text-gray-900">Casual chat A&Q</div>
                <div className="text-sm text-gray-500 mt-1">Informal Conversations with AI and make assignments</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div>
        <SetupStepsFormBtns disabled={!isValid} loading={isLoading} backStepVal={0.1} />
      </div>
    </form>
  );
};

export default StepThreeP5StudentForm;
