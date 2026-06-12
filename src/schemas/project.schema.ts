import { z } from "zod";
import { ProjectStatus, ResourceType } from "@/generated/prisma";

export const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Invalid slug"),
  name: z.string().min(2),
  description: z.string().min(10).max(300, "Description must be 300 characters or less"),
  status: z.nativeEnum(ProjectStatus).default(ProjectStatus.COMPLETED),
  featured: z.boolean().default(false),
  githubUrl: z.string().url().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  tags: z.array(z.string()).default([]),
});

export const resourceSchema = z.object({
  type: z.nativeEnum(ResourceType),
  title: z.string().min(3),
  description: z.string().optional(),
  url: z.string().url().optional(),
  content: z.string().optional(),
  order: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ResourceInput = z.infer<typeof resourceSchema>;
