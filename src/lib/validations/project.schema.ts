import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.preprocess((value) => value === "" ? undefined : value, z.string().optional()),
  title: z.string().trim().min(2).max(100),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/).max(110),
  category: z.string().trim().min(2).max(60),
  description: z.string().trim().min(12).max(320),
  imageUrl: z.string().trim().startsWith("/").max(240),
  isFeatured: z.preprocess((value) => value === "on", z.boolean()),
  isActive: z.preprocess((value) => value === "on", z.boolean()),
  sortOrder: z.coerce.number().int().min(0).max(1000),
});
