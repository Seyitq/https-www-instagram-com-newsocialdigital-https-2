"use server";

import { createInquiryAction as saveInquiry } from "@/server/actions/inquiry.actions";
import type { InquiryActionState } from "@/server/actions/inquiry.actions";

export async function createInquiryAction(
  previousState: InquiryActionState,
  formData: FormData,
): Promise<InquiryActionState> {
  return saveInquiry(previousState, formData);
}
