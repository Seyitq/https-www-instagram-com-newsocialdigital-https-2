import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.preprocess((value) => value === "" ? undefined : value, z.string().optional()),
  title: z.string().trim().min(2).max(80),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/).max(90),
  description: z.string().trim().min(12).max(320),
  iconName: z.enum(["camera", "clapperboard", "sparkles", "pen-tool", "megaphone", "layers"]),
  sortOrder: z.coerce.number().int().min(0).max(1000),
});
