import { prisma } from "@/server/db/prisma";
import type { InquirySchema } from "@/lib/validations/inquiry.schema";
import type { z } from "zod";

type InquiryInput = z.infer<typeof InquirySchema>;

export const inquiryRepository = {
  create(input: InquiryInput) {
    return prisma.inquiry.create({
      data: {
        name: input.name,
        email: input.email,
        company: input.company || null,
        service: input.service || null,
        message: input.message,
        consentAt: new Date(),
      },
    });
  },

  list() {
    return prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  updateStatus(id: string, status: "NEW" | "CONTACTED" | "ARCHIVED") {
    return prisma.inquiry.update({ where: { id }, data: { status } });
  },

  count() {
    return prisma.inquiry.count();
  },
};
