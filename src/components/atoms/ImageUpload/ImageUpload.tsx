"use client";
import React, { useRef } from "react";
import cameraIcon from "@/assets/images/camera.png";
import Image from "next/image";
import { toast } from "react-toastify";

export interface ImageUploadProps {
  label?: string;
  name?: string;
  accept?: string;
  value?: string; // data URL preview
  onChange?: (dataUrl: string | null, file?: File) => void;
  helperText?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  accept = "image/*",
  value = "",
  onChange,
  helperText,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (file?: File) => {
    if (!file) {
      onChange?.(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        toast.loading("Uploading image...", { toastId: "image-upload" });
      onChange?.((reader.result as string) || null, file);
    };
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        toast.update("image-upload", {
            render: "Image uploaded successfully!",
            type: "success",
            isLoading: false,
            autoClose: 1000,
        });
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {label}
        </label>
      )}

      <div
        className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center gap-4 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
          {value ? (
            <img
              src={value}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={cameraIcon}
              alt="camera icon"
              className="w-1/2 h-1/2"
            />
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-3">
            {helperText ?? "Drag & Drop or click to upload your photo."}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Upload Photo
            </button>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
