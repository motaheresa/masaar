import { z } from "zod";

export const StepThreeP1Schema = z.object({
  educationLevel: z.enum(['HIGH_SCHOOL', 'UNDERGRADUATE', 'GRADUATE', 'DOCTORATE', 'BOOTCAMP', 'SELF_TAUGHT']).optional(),
  university: z.string().min(2, "University name must be at least 2 characters").max(100, "University name must be at most 100 characters"),
  major: z.string().min(2, "Major must be at least 2 characters").max(100, "Major must be at most 100 characters"),
  currentYear: z.string().min(1, "Current year is required").max(50, "Current year must be at most 50 characters"),
});

export type TStepThreeFormData = z.infer<typeof StepThreeP1Schema>;
