import { z } from "zod";
import { TagCategory } from "@/generated/prisma";

export const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().optional(),
  category: z.nativeEnum(TagCategory),
});

export type TagFormData = z.infer<typeof tagSchema>;
