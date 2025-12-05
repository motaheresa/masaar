import { z } from "zod";

export const StepTwoSchema = z.object({
  gender: z.enum(["", "MALE", "FEMALE", "NOT_PREFERRED"], {
    required_error: "Gender is required",
    invalid_type_error: "Invalid gender selection",
  }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be at most 100 characters")
    .optional(),
  country: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be at most 100 characters")
    .optional(),

  bio: z.string().max(300, "Bio must be at most 300 characters").optional(),
});

export type TStepTwoeFormData = z.infer<typeof StepTwoSchema>;
