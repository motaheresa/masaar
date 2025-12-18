"use client";

import { Button } from "@/components/atoms/Button/Button";
import { TextArea } from "@/components/atoms/TextArea/TextArea";
import { OptionButtonGroup, OptionItem } from "@/components/molecules/form/OptionButtonGroup";
import { useCreateProjectForm } from "../../hooks/useCreateProjectForm";
import { LuSparkles, LuGraduationCap, LuSettings, LuRocket, LuCode, LuDatabase, LuPalette, LuSmartphone } from "react-icons/lu";

const difficultyOptions: OptionItem[] = [
  { value: "beginner", label: "Beginner", icon: LuGraduationCap },
  { value: "intermediate", label: "Intermediate", icon: LuSettings },
  { value: "advanced", label: "Advanced", icon: LuRocket },
];

const domainOptions: OptionItem[] = [
  { value: "frontend", label: "Front-End Development", icon: LuCode },
  { value: "datascience", label: "Data Science", icon: LuDatabase },
  { value: "uiux", label: "UI-UX Design", icon: LuPalette },
  { value: "mobile", label: "Mobile Development", icon: LuSmartphone },
];

export const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    watch,
    handleDifficultyChange,
    handleDomainToggle,
  } = useCreateProjectForm();
  console.log(watch())

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Project Prompt */}
      <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <TextArea
          label="Project Prompt"
          name="projectPrompt"
          register={register}
          isRequired={true}
          
          rows={5}
          placeholder="Describe Your Project with good explanation to get best detailed project. Be Detailed in Description Project e.g. Build Portfolio with HTML , CSS , JavaScript ..."
          error={errors.projectPrompt?.message}
          className="rounded-sm bg-white"
        />
      </div>

      {/* Project Difficulty */}
      <div className="animate-slide-up p-3 rounded-sm " style={{ animationDelay: "0.15s" }}>
        <OptionButtonGroup
          label="Select Project Difficulty"
          options={difficultyOptions}
          selectedValue={watch("difficulty")}
          onChange={handleDifficultyChange}
          showIcons={true}
          
          btnStyle="rounded-md flex-1 py-4 cursor-pointer"
          btnContainerStyle=" rounded-sm bg-gray-50 px-4! py-4! border shadow"
          error={errors.difficulty?.message}
        />
      </div>

      {/* Domain Selection */}
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <OptionButtonGroup
          label="Choose Domain of Project"
          options={domainOptions}
          selectedValue={watch("domains")}
          onChange={handleDomainToggle}
          multiple={true}
          showIcons={false}
          btnStyle="cursor-pointer"
          error={errors.domains?.message}
        />
      </div>

      {/* Submit Button */}
      <div className="animate-slide-up pt-4" style={{ animationDelay: "0.25s" }}>
        <Button
          type="submit"
          Icon={LuSparkles}
          className="w-fit! py-3.5! mx-auto"
          disabled={isLoading}
          loading={isLoading}
        >
          Generate Project
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
