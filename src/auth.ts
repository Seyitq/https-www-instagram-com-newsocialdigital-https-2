import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdminLoginSchema } from "@/lib/validations/auth.schema";
import { getServerEnv } from "@/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-posta", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        const parsed = AdminLoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const env = getServerEnv();
        if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD_HASH) return null;
        if (parsed.data.email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) return null;

        const passwordMatches = await bcrypt.compare(
          parsed.data.password,
          env.ADMIN_PASSWORD_HASH,
        );
        if (!passwordMatches) return null;

        return {
          id: "admin",
          name: "Yönetici",
          email: env.ADMIN_EMAIL,
        };
      },
    }),
  ],
});
