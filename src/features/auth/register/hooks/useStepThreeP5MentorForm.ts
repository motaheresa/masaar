import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterSteps } from "@/contexts/RegisterStepsContext";
import { toast } from "react-toastify";
import {
  StepThreeP5MentorSchema,
  TStepThreeP5MentorFormData,
} from "../schemas/StepThreeP5MentorFormSchema";
import React, { useState } from "react";
import { registerApi } from "../api/registerApi";
import { toastConfig } from "@/config/toastConfig";
import { useRouter } from "next/navigation";

type UploadState = "idle" | "prepared" | "uploading" | "success" | "error";

export const useStepThreeP5MentorForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors, isLoading },
  } = useForm<TStepThreeP5MentorFormData>({
    mode: "onChange",
    resolver: zodResolver(StepThreeP5MentorSchema),
    defaultValues: {
      cv: undefined,
      cvFileName: undefined,
    },
  });

  const { nextStep } = useRegisterSteps();
  const router = useRouter();
  const [uploadState, setUploadState] = useState<UploadState>("idle");

  const ERROR_MESSAGE =
    "Invalid file. Please upload a PDF file under 1MB.";

  const onSubmit = async (data: TStepThreeP5MentorFormData) => {
    setUploadState("uploading");
    const loadingId = toast.loading("Uploading CV...", toastConfig.loading);
    try {
      const res = await registerApi.uploadMentorCV(data.cv!);
      console.log("CV Upload Response: ", res);
          console.log( "one",res.message.length);

      if (res.status === "error") {
        setUploadState("error");
        debugger

        if (loadingId) {       
          toast.update(loadingId, {
            render: res.message.length>50?res.message?.substring(50)+"...":res.message || ERROR_MESSAGE,
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
        } else {
                    console.log( "one",res.message,"two",res.message.length,"three",res.message?.splice(50));

          toast.error(res.message.length>50?res.message?.substring(50)+"...":res.message || ERROR_MESSAGE, toastConfig.error);
        }

        return false;
      } else {
        if (loadingId) {
          toast.update(loadingId, {
            render: res.message || "CV uploaded successfully!",
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        } else {
          toast.success("CV uploaded successfully!", toastConfig.success);
        }
        setUploadState("success");

        // Store CV validation data in sessionStorage
        if (res.data) {
          sessionStorage.setItem(
            "cvValidationData",
            JSON.stringify(res.data)
          );

          // Navigate based on aiScore
          const aiScore = res.data.aiScore || 0;
          if (aiScore > 50) {
            // High score - navigate to valid page
            setTimeout(() => {
              router.push("/register/cv-upload/valid");
            }, 1500);
          } else {
            // Low score - navigate to not-valid page
            setTimeout(() => {
              router.push("/register/cv-upload/not-valid");
            }, 1500);
          }
        }
      }
      return true;
    } catch (err) {
      
      setUploadState("error");
      const errMsg =
        err instanceof Error
          ? err.message
          : "An error occurred while uploading CV.";
      if (loadingId) {
        toast.update(loadingId, {
          render: errMsg,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      } else {
        toast.error(errMsg, toastConfig.error);
      }
      return false;
    }
  };

  const cancelPrepared = () => {
    setValue("cv", undefined);
    setValue("cvFileName", undefined);
    setUploadState("idle");
  };

  const handleFileSelect = (file?: File) => {
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!validTypes.includes(file.type) || file.size > maxSize) {
      toast.error(ERROR_MESSAGE);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setValue("cv", file);
      setValue("cvFileName", file.name);
      setUploadState("prepared");
    };
    reader.onerror = () => {
      toast.error(ERROR_MESSAGE);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    watch,
    isLoading,
    isValid,
    // upload specific
    uploadState,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleInputChange,
    cancelPrepared,
  };
};

export default useStepThreeP5MentorForm;
