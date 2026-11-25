import type { z } from "zod";
import { InquirySchema } from "@/lib/validations/inquiry.schema";
import { inquiryRepository } from "@/server/repositories/inquiry.repository";

export const inquiryService = {
  create(input: z.infer<typeof InquirySchema>) {
    return inquiryRepository.create(input);
  },

  getAll() {
    return inquiryRepository.list();
  },

  updateStatus(id: string, status: "NEW" | "CONTACTED" | "ARCHIVED") {
    return inquiryRepository.updateStatus(id, status);
  },

  count() {
    return inquiryRepository.count();
  },
};
