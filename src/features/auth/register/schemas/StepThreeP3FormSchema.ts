import { z } from "zod";

export const StepThreeP3Schema = z.object({
  avatar: z.string().optional(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  preferredDifficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export type TStepThreeP3FormData = z.infer<typeof StepThreeP3Schema>;
