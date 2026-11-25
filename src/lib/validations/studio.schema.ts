import { z } from "zod";

export const StudioServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  iconName: z.string(),
});

export const StudioProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  description: z.string(),
  slug: z.string(),
  imageUrl: z.string(),
  isFeatured: z.boolean(),
});
