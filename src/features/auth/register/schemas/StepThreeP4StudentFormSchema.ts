import { z } from "zod";

export const TagSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1),
});

export const StepThreeP4StudentSchema = z.object({
  languages: z
    .array(TagSchema)
    .min(1, "At least one language is required")
    .max(10, "Maximum of 10 languages allowed"),
  topics: z
    .array(TagSchema)
    .min(1, "At least one topic of interest is required")
    .max(10, "Maximum of 10 topics allowed"),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
});

export type TStepThreeP4StudentFormData = z.infer<typeof StepThreeP4StudentSchema>;
