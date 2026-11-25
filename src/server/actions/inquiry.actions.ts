"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { InquirySchema, InquiryStatusSchema, InquiryActionStateSchema } from "@/lib/validations/inquiry.schema";
import { inquiryService } from "@/server/services/inquiry.service";

export type InquiryActionState = z.infer<typeof InquiryActionStateSchema>;

export async function createInquiryAction(
  _previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "error", message: "Mesaj gönderilemedi. Formu tekrar doldurmayı dene." };
  }

  const parsed = InquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: "İşaretli alanları kontrol edip tekrar gönder.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    await inquiryService.create(parsed.data);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { status: "success", message: "Mesajın ulaştı. En kısa sürede dönüş yapacağız." };
  } catch (error) {
    console.error("[INQUIRY_CREATE_FAILED]", error);
    return { status: "error", message: "Mesaj şu anda gönderilemedi. Lütfen tekrar dene." };
  }
}

export async function updateInquiryStatusAction(
  id: string,
  rawStatus: string,
): Promise<{ error?: string; message?: string }> {
  const session = await auth();
  if (!session?.user) return { error: "Yönetici girişi gerekli." };

  const parsed = z.object({
    id: z.string().min(10),
    status: InquiryStatusSchema,
  }).safeParse({ id, status: rawStatus });
  if (!parsed.success) return { error: "Talep bilgisi geçersiz." };

  try {
    await inquiryService.updateStatus(parsed.data.id, parsed.data.status);
    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");
    return { message: "Talep durumu güncellendi." };
  } catch (error) {
    console.error("[INQUIRY_STATUS_FAILED]", error);
    return { error: "Talep durumu güncellenemedi." };
  }
}
