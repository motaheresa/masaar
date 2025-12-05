"use client";
import { motion } from "framer-motion";
import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { Button } from "@/components/atoms/Button/Button";
import { useStepTwoForm } from "../../hooks/useStepTwoForm";
import { LuPhoneCall } from "react-icons/lu";
import { MdLocationPin } from "react-icons/md";
import Textarea from "@/components/molecules/form/Input/Textarea";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";

// Review on code in this component
// make schema

const genderOptions = [
  { value: "MALE", label: "Male", icon: "♂️" },
  { value: "FEMALE", label: "Female", icon: "♀️" },
  { value: "not_preferred", label: "Not Preferred", icon: "" },
];
const StepTwoForm = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isValid,
    isLoading,
    watch,
    setValue,
  } = useStepTwoForm();
  const selectedGender = watch("gender");
  const {prevStep} =useRegisterSteps()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Gender Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Gender
        </label>
        <div className="grid grid-cols-3 gap-4">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                const input = document.querySelector(
                  `input[name="gender"][value="${option.value}"]`
                ) as HTMLInputElement;
                setValue("gender", option.value);
                if (input) input.click();
              }}
              className={`py-3 px-4 rounded-md cursor-pointer border-2 font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                selectedGender === option.value
                  ? "border-teal-400 bg-primary text-gray-900"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-primary-hover/40 hover:border-gray-300"
              }`}
            >
              {option.icon && <span>{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
        <input type="hidden" {...register("gender")} />
        {errors.gender && (
          <p className="text-red-500 text-xs mt-2">{errors.gender.message}</p>
        )}
      </motion.div>

      {/* Phone Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <OutlineTextField
          icon={<LuPhoneCall className="text-lg text-gray-300" />}
          label="Phone Number"
          placeholder="e.g +02244537"
          name="phoneNumber"
          type="tel"
          className="ps-10!"
          register={register}
          error={errors.phoneNumber?.message}
        />
      </motion.div>

      {/* City */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <OutlineTextField
          icon={<MdLocationPin className="text-lg text-gray-300" />}
          label="City"
          placeholder="e.g Benha Degwa"
          name="city"
          register={register}
          error={errors.city?.message}
        />
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Bio
        </label>
        <Textarea
          register={register}
          name="bio"
          rowsNum={5}
          errors={errors.bio}
          placeholder="Tell us about your coding journey and yourself"
        />
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="pt-4 flex items-center justify-center gap-4"
      >
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full flex-2"
        >
          {isLoading ? "Completing Sign up..." : "Complete Sign up"}
        </Button>
        <Button
        onClick={()=>prevStep(1)}
          variant="outline"
          type="button"
          className="w-full flex-1"
        >
          Back
        </Button>
      </motion.div>
    </form>
  );
};

export default StepTwoForm;
