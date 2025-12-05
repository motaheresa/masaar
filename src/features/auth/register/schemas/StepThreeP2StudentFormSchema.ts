import { z } from "zod";

export const TagSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

export const StepThreeP2StudentSchema = z.object({
  skills: z.array(TagSchema).optional(),
  learningGoals: z.array(TagSchema).optional(),
  preferredTechnologies: z.array(TagSchema).optional(),
});

export type TStepThreeP2StudentFormData = z.infer<typeof StepThreeP2StudentSchema>;
