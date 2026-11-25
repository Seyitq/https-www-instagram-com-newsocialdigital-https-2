import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().trim().min(2, "Ad soyad en az 2 karakter olmalı.").max(80, "Ad soyad en fazla 80 karakter olabilir."),
  email: z.string().trim().email("Geçerli bir e-posta adresi yaz.").max(254),
  company: z.string().trim().max(120, "Marka adı en fazla 120 karakter olabilir.").optional().or(z.literal("")),
  service: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(12, "Projeni en az 12 karakterle anlat.").max(2000, "Proje açıklaması en fazla 2000 karakter olabilir."),
  privacyAccepted: z.preprocess(
    (value) => value === "on",
    z.boolean().refine((value) => value, "Gizlilik onayı gerekli."),
  ),
});

export const InquiryStatusSchema = z.enum(["NEW", "CONTACTED", "ARCHIVED"]);

export const InquiryActionStateSchema = z.object({
  status: z.enum(["idle", "success", "error"]),
  message: z.string().optional(),
  fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
});
