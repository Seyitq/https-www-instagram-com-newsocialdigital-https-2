"use client";

import { useActionState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import type { Project } from "@/generated/prisma/client";
import { saveProjectAction, type ContentActionState } from "@/server/actions/content.actions";

const initialState: ContentActionState = {};

export function ProjectForm({ project, compact = false }: { project?: Project; compact?: boolean }) {
  const [state, action, pending] = useActionState(saveProjectAction, initialState);

  return (
    <form className={compact ? "" : "admin-card admin-form-card"} action={action}>
      {!compact && <h2>Portföye ekle</h2>}
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="admin-form-grid">
        <label className="admin-form-field">
          Proje adı
          <input name="title" defaultValue={project?.title} placeholder="Örn. Marka lansmanı" required maxLength={100} />
        </label>
        <label className="admin-form-field">
          Adres
          <input name="slug" defaultValue={project?.slug} placeholder="marka-lansmani" required pattern="[a-z0-9-]+" maxLength={110} />
        </label>
        <label className="admin-form-field">
          Kategori
          <input name="category" defaultValue={project?.category} placeholder="Video ve fotoğraf" required maxLength={60} />
        </label>
        <label className="admin-form-field">
          Görsel yolu
          <input name="imageUrl" defaultValue={project?.imageUrl} placeholder="/images/proje.webp" required maxLength={240} />
        </label>
        <label className="admin-form-field admin-form-field--wide">
          Kısa açıklama
          <textarea name="description" defaultValue={project?.description} placeholder="Çalışmanın kapsamını anlat." required minLength={12} maxLength={320} />
        </label>
        <label className="admin-form-field">
          Sıra
          <input name="sortOrder" type="number" min="0" max="1000" defaultValue={project?.sortOrder ?? 10} required />
        </label>
        <div className="admin-form-checks">
          <label><input name="isFeatured" type="checkbox" defaultChecked={project?.isFeatured ?? true} /> Öne çıkar</label>
          <label><input name="isActive" type="checkbox" defaultChecked={project?.isActive ?? true} /> Yayında</label>
        </div>
        <div className="admin-form-actions">
          <button className="admin-button" type="submit" disabled={pending}>
            {pending ? <LoaderCircle className="spin" size={14} /> : <Save size={14} />}
            {project ? "Değişiklikleri kaydet" : "Portföye ekle"}
          </button>
          {state.message && <p className="admin-result" aria-live="polite">{state.message}</p>}
          {state.error && <p className="admin-result" data-state="error" aria-live="polite">{state.error}</p>}
        </div>
      </div>
    </form>
  );
}
