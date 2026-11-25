"use client";

import { useActionState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import type { Service } from "@/generated/prisma/client";
import { saveServiceAction, type ContentActionState } from "@/server/actions/content.actions";

const initialState: ContentActionState = {};

export function ServiceForm({ service, compact = false }: { service?: Service; compact?: boolean }) {
  const [state, action, pending] = useActionState(saveServiceAction, initialState);

  return (
    <form className={compact ? "" : "admin-card admin-form-card"} action={action}>
      {!compact && <h2>Hizmet ekle</h2>}
      {service && <input type="hidden" name="id" value={service.id} />}
      <div className="admin-form-grid">
        <label className="admin-form-field">
          Hizmet adı
          <input name="title" defaultValue={service?.title} placeholder="Örn. Marka filmi" required maxLength={80} />
        </label>
        <label className="admin-form-field">
          Adres
          <input name="slug" defaultValue={service?.slug} placeholder="marka-filmi" required pattern="[a-z0-9-]+" maxLength={90} />
        </label>
        <label className="admin-form-field admin-form-field--wide">
          Kısa açıklama
          <textarea name="description" defaultValue={service?.description} placeholder="Bu hizmette neler sunuyorsunuz?" required minLength={12} maxLength={320} />
        </label>
        <label className="admin-form-field">
          Simge
          <select name="iconName" defaultValue={service?.iconName ?? "sparkles"}>
            <option value="camera">Kamera</option>
            <option value="clapperboard">Video</option>
            <option value="sparkles">Yapay zeka</option>
            <option value="pen-tool">Tasarım</option>
            <option value="megaphone">Reklam</option>
            <option value="layers">Sosyal medya</option>
          </select>
        </label>
        <label className="admin-form-field">
          Sıra
          <input name="sortOrder" type="number" min="0" max="1000" defaultValue={service?.sortOrder ?? 10} required />
        </label>
        <div className="admin-form-actions">
          <button className="admin-button" type="submit" disabled={pending}>
            {pending ? <LoaderCircle className="spin" size={14} /> : <Save size={14} />}
            {service ? "Değişiklikleri kaydet" : "Hizmet ekle"}
          </button>
          {state.message && <p className="admin-result" aria-live="polite">{state.message}</p>}
          {state.error && <p className="admin-result" data-state="error" aria-live="polite">{state.error}</p>}
        </div>
      </div>
    </form>
  );
}
