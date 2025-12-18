"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectSchema, TCreateProjectFormData } from "../schemas/CreateProjectSchema";
import { toast } from "react-toastify";

export const useCreateProjectForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid,isSubmitting },
        setValue,
        watch,
        trigger
    } = useForm<TCreateProjectFormData>({
        mode: "onChange",
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            projectPrompt: "",
            difficulty: "",
            domains: "",
        },
    });
    console.log(errors);
    

    const handleDifficultyChange = (value: string) => {
        setValue("difficulty", value as TCreateProjectFormData["difficulty"]);
        trigger("difficulty")
    };

    const handleDomainToggle = (domain: string) => {
        // const newDomains = selectedDomains.includes(domain)
        //     ? selectedDomains.filter((d) => d !== domain)
        //     : [...selectedDomains, domain];

        setValue("domains", domain);
        trigger("domains")
    };

    const onSubmit = async (data: TCreateProjectFormData) => {

        try {
            console.log("Form submitted:", {
                ...data,
                difficulty: watch("difficulty"),
                domains: watch("domains"),
            });

            // TODO: Implement project generation API call
            toast.success("Project generation started!");

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred";
            toast.error(errorMessage);
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isLoading: isSubmitting,
        isValid,
        watch,
        handleDifficultyChange,
        handleDomainToggle,
    };
};
