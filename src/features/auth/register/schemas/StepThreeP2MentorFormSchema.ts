import { z } from "zod";

export const TagSchema = z.object({
  id: z.string().or(z.number()),
  name: z.string().min(1),
});

export const StepThreeP2MentorSchema = z.object({
  jobTitle: z.array(TagSchema).min(1, "At least one job title is required").max(5, "Maximum of 5 job titles allowed"),
  yearsOfExperience: z.string(),
  skills: z.array(TagSchema).min(1, "At least one skill is required").max(10, "Maximum of 10 skills allowed"),
});

export type TStepThreeP2MentorFormData = z.infer<typeof StepThreeP2MentorSchema>;
