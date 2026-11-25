"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { z } from "zod";
import { ServiceSchema } from "@/lib/validations/service.schema";
import { ProjectSchema } from "@/lib/validations/project.schema";
import { contentService } from "@/server/services/content.service";

export type ContentActionState = {
  message?: string;
  error?: string;
};

async function requireAdmin() {
  const session = await auth();
  return Boolean(session?.user);
}

export async function saveServiceAction(
  _previousState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  if (!(await requireAdmin())) return { error: "Yönetici girişi gerekli." };

  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Alanları kontrol edip tekrar kaydet." };

  try {
    await contentService.saveService(parsed.data);
    revalidatePath("/");
    revalidatePath("/admin/services");
    return { message: "Hizmet kaydedildi." };
  } catch (error) {
    console.error("[SERVICE_SAVE_FAILED]", error);
    return { error: "Hizmet kaydedilemedi. Adresi farklı bir hizmette kullanılmış olabilir." };
  }
}

export async function setServiceActiveAction(
  id: string,
  isActive: boolean,
): Promise<void> {
  if (!(await requireAdmin())) redirect("/admin/login");
  const parsed = z.object({ id: z.string().min(10), isActive: z.boolean() }).safeParse({ id, isActive });
  if (!parsed.success) return;

  try {
    await contentService.setServiceActive(parsed.data.id, parsed.data.isActive);
    revalidatePath("/");
    revalidatePath("/admin/services");
  } catch (error) {
    console.error("[SERVICE_STATUS_FAILED]", error);
  }
}

export async function saveProjectAction(
  _previousState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  if (!(await requireAdmin())) return { error: "Yönetici girişi gerekli." };

  const parsed = ProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Alanları kontrol edip tekrar kaydet." };

  try {
    await contentService.saveProject(parsed.data);
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { message: "Proje kaydedildi." };
  } catch (error) {
    console.error("[PROJECT_SAVE_FAILED]", error);
    return { error: "Proje kaydedilemedi. Adresi farklı bir projede kullanılmış olabilir." };
  }
}

export async function setProjectActiveAction(
  id: string,
  isActive: boolean,
): Promise<void> {
  if (!(await requireAdmin())) redirect("/admin/login");
  const parsed = z.object({ id: z.string().min(10), isActive: z.boolean() }).safeParse({ id, isActive });
  if (!parsed.success) return;

  try {
    await contentService.setProjectActive(parsed.data.id, parsed.data.isActive);
    revalidatePath("/");
    revalidatePath("/admin/projects");
  } catch (error) {
    console.error("[PROJECT_STATUS_FAILED]", error);
  }
}
