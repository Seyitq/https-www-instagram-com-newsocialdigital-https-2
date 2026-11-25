"use client";

import { useState, useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { updateInquiryStatusAction } from "@/server/actions/inquiry.actions";

const statusLabel = {
  NEW: "Yeni",
  CONTACTED: "İletişime geçildi",
  ARCHIVED: "Arşivlendi",
};

export function InquiryStatusSelect({ id, initialStatus }: { id: string; initialStatus: keyof typeof statusLabel }) {
  const [status, setStatus] = useState(initialStatus);
  const [pending, startTransition] = useTransition();

  function updateStatus(nextStatus: keyof typeof statusLabel) {
    setStatus(nextStatus);
    startTransition(async () => {
      const result = await updateInquiryStatusAction(id, nextStatus);
      if (result.error) setStatus(initialStatus);
    });
  }

  return (
    <div className="admin-action-row">
      <select
        className="admin-inline-select"
        value={status}
        aria-label="Talep durumu"
        disabled={pending}
        onChange={(event) => updateStatus(event.target.value as keyof typeof statusLabel)}
      >
        {Object.entries(statusLabel).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {pending && <LoaderCircle className="spin" size={13} aria-label="Güncelleniyor" />}
    </div>
  );
}
