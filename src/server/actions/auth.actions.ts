"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { getServerEnv } from "@/env";
import { AdminLoginSchema } from "@/lib/validations/auth.schema";

export type LoginActionState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = AdminLoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "E-posta adresini ve şifreni kontrol et." };
  }

  const env = getServerEnv();
  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD_HASH) {
    return { error: "Admin giriş bilgileri henüz ayarlanmadı." };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-posta veya şifre doğru değil." };
    }
    throw error;
  }

  return {};
}
