import { z } from "zod";

export const CreateProjectSchema = z.object({
    projectPrompt: z
        .string()
        .min(10, "Project description must be at least 10 characters")
        .max(2000, "Project description must be less than 2000 characters"),
    difficulty: z.enum(["beginner", "intermediate", "advanced"]),
    domains: z.string().min(1, "Please select at least one domain"),
});

export type TCreateProjectFormData = z.infer<typeof CreateProjectSchema>;
