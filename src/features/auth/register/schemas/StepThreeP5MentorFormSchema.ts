import { z } from "zod";

export const StepThreeP5MentorSchema = z.object({
  cv: z.instanceof(File, { message: "CV file is required" }).optional(),
  cvFileName: z.string().optional(),
});

export type TStepThreeP5MentorFormData = z.infer<typeof StepThreeP5MentorSchema>;
