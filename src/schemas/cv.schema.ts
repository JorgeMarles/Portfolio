import { z } from "zod";

export const cvSchema = z.object({
  name: z.string().min(1, "Name is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  isPublic: z.boolean().optional(),
});

export type CvFormData = z.infer<typeof cvSchema>;
