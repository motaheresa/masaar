import { z } from "zod";

export const StepThreeP5StudentSchema = z.object({
  topics: z.array(z.string()).min(1, "At least one topic must be selected").max(5, "You can select up to 5 topics"),
  learningPreference: z.enum(["pair", "casual"]),
});

export type TStepThreeP5StudentFormData = z.infer<typeof StepThreeP5StudentSchema>;
