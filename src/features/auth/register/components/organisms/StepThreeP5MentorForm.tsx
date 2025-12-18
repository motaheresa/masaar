"use client";
import React, { useRef } from "react";

import SetupStepsFormHeader from "../molecules/SetupStepsFormHeader";
import { useStepThreeP5MentorForm } from "../../hooks/useStepThreeP5MentorForm";
import { MdCloudUpload } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

const StepThreeP5MentorForm: React.FC = () => {
  const {
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    uploadState,
    handleDrop,
    handleDragOver,
    handleInputChange,
    cancelPrepared,
  } = useStepThreeP5MentorForm();

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const cvFileName = watch("cvFileName");

  const registerToken = localStorage.getItem("accessToken");
  if (!registerToken) {
    router.replace("/register/role-selection");
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-10">
      <div>
        <SetupStepsFormHeader
          heading="Showcase Your Expertise"
          subHeading="Upload your CV to match your skills with the correct mentor"
        />
      </div>

      <div className="space-y-4">
        {/* Upload State */}
        {uploadState === "idle" && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => inputRef.current?.click()}
            className="bg-primary/20 border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/30 transition-colors animate-fade-in"
          >
            <MdCloudUpload className="mx-auto text-3xl text-primary mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">
              Drag & drop your CV here
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Support formats: PDF, Max Size : 1MB
            </p>
            <button
              type="button"
              // onClick={() => inputRef.current?.click()}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition-colors"
            >
              Browse Files
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={handleInputChange}
              className="hidden"
              aria-label="Upload CV"
            />
          </div>
        )}

        {/* Prepared State - file read and ready to upload */}
        {uploadState === "prepared" && (
          <div
            className="bg-primary/10 border border-primary rounded-lg p-6 text-center animate-fade-in"
          >
            <h3 className="font-semibold text-gray-900 mb-1">
              File ready to upload
            </h3>
            {cvFileName && (
              <p className="text-sm text-gray-600 mb-4">{cvFileName}</p>
            )}
            <div className="flex items-center justify-center gap-4">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover transition-colors"
              >
                Upload CV
              </button>

              <button
                type="button"
                onClick={() => {
                  // cancel prepared file
                  cancelPrepared();
                }}
                className="text-gray-600 underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Uploading State - file is being uploaded */}
        {uploadState === "uploading" && (
          <div
            className="bg-primary/10 border border-primary/30 rounded-lg p-8 text-center animate-fade-in"
          >
            <div className="mx-auto mb-3">
              <div
                className="inline-block animate-spin-slow"
              >
                <MdCloudUpload className="text-4xl text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-primary mb-2">
              Uploading your CV...
            </h3>
            <p className="text-sm text-primary/70">
              Please wait while we process your file.
            </p>
            <div className="mt-4 w-full bg-primary/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-primary animate-progress"
              />
            </div>
          </div>
        )}

        {/* Success State */}
        {uploadState === "success" && (
          <div
            className="bg-emerald-50 border border-emerald-300 rounded-lg p-8 text-center animate-scale-in"
          >
            <MdCheckCircle className="mx-auto text-5xl text-emerald-600 mb-3" />
            <h3 className="font-semibold text-emerald-900 mb-4">
              CV Uploaded Successfully!
            </h3>
            <p className="text-sm text-emerald-700">
              Your CV is being analyzed and validated. Redirecting to results...
            </p>
          </div>
        )}

        {/* Error State */}
        {uploadState === "error" && (
          <div
            className="bg-rose-50 border border-rose-300 rounded-lg p-8 text-center animate-scale-in"
          >
            <div className="mx-auto text-5xl text-rose-600 mb-3">⚠️</div>
            <h3 className="font-semibold text-rose-900 mb-2">
              Upload Failed
            </h3>
            <button
              type="button"
              onClick={() => cancelPrepared()}
              className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>


    </form>
  );
};

export default StepThreeP5MentorForm;
