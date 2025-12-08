import { z } from "zod";

export const TagSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1),
});

export const StepThreeP2StudentSchema = z.object({
  topics: z.array(TagSchema).min(1, "At least one topic is required").max(10, "Maximum of 10 topics allowed"),
  skills: z.array(TagSchema).min(1, "At least one skill is required").max(10, "Maximum of 10 skills allowed"),
  learningGoals: z.array(TagSchema).min(1, "At least one learning goal is required").max(10, "Maximum of 10 learning goals allowed"),
  preferredTechnologies: z.array(TagSchema).min(1, "At least one technology is required").max(10, "Maximum of 10 technologies allowed"),
});

export type TStepThreeP2StudentFormData = z.infer<typeof StepThreeP2StudentSchema>;

