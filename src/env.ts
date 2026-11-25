import { z } from "zod";

const serverEnvironmentSchema = z.object({
  DATABASE_URL: z.string().startsWith("file:"),
  AUTH_SECRET: z.string().min(32).optional(),
  AUTH_URL: z.url().optional(),
  ADMIN_EMAIL: z.email().optional(),
  ADMIN_PASSWORD_HASH: z.string().min(20).optional(),
  STUDIO_REEL_URL: z.string().regex(/^\/video\/[a-zA-Z0-9/_-]+\.(mp4|webm)$/).optional(),
});

export function getServerEnv() {
  return serverEnvironmentSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL || "file:./prisma/dev.db",
    AUTH_SECRET: process.env.AUTH_SECRET || undefined,
    AUTH_URL: process.env.AUTH_URL || undefined,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || undefined,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || undefined,
    STUDIO_REEL_URL: process.env.STUDIO_REEL_URL || "/video/BK_MediaHouse_Hero_720x900.mp4",
  });
}
