"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { z } from "zod";
import type { StudioProjectSchema } from "@/lib/validations/studio.schema";
import { getProjectVisual } from "@/lib/studio-content";

type StudioProject = z.infer<typeof StudioProjectSchema>;

export function ProjectGallery({ projects }: { projects: StudioProject[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const contactRequested = useRef(false);
  const [selected, setSelected] = useState<StudioProject | null>(null);

  function openProject(project: StudioProject, button: HTMLButtonElement) {
    trigger.current = button;
    contactRequested.current = false;
    setSelected(project);
    dialog.current?.showModal();
  }

  function closeProject() {
    dialog.current?.close();
  }

  const selectedVisual = selected ? getProjectVisual(selected.imageUrl) : null;

  return (
    <>
      <div className="work-grid">
        {projects.map((project, index) => {
          const visual = getProjectVisual(project.imageUrl);
          return (
            <article className={"work-card work-card--" + (index % 3)} key={project.id}>
              <h3 className="work-card__heading">
              <button
                className="work-card__open"
                type="button"
                onClick={(event) => openProject(project, event.currentTarget)}
                aria-label={project.title + " detayını aç"}
              >
                <span className="work-card__image">
                  <Image src={visual.src} alt={project.title + (visual.isConcept ? "; konsept çalışma için temsilî görsel" : "")} fill sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 400px" />
                  <span className="work-card__tag">{visual.isConcept ? "Konsept çalışma" : project.category}</span>
                </span>
                <span className="work-card__meta">
                  <span className="work-card__name">{project.title}</span>
                  <span className="work-card__category">{project.category}</span>
                  <span className="work-card__view">Projeyi incele <ArrowUpRight size={16} /></span>
                </span>
              </button>
              </h3>
              <p className="work-card__description">{project.description}</p>
            </article>
          );
        })}
      </div>
      {projects.length === 0 && <p className="studio-muted">Yeni işler yakında burada.</p>}
      <dialog
        className="project-dialog"
        ref={dialog}
        aria-labelledby="project-dialog-title"
        onClose={() => {
          if (contactRequested.current) {
            document.getElementById("iletisim")?.focus({ preventScroll: true });
          } else {
            trigger.current?.focus({ preventScroll: true });
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) closeProject(); }}
      >
        {selected && selectedVisual && (
          <div className="project-dialog__body">
            <div className="project-dialog__top">
              <span>{selectedVisual.isConcept ? "Konsept çalışma" : selected.category}</span>
              <button autoFocus type="button" onClick={closeProject} aria-label="Proje detayını kapat"><X size={23} /></button>
            </div>
            <div className="project-dialog__image">
              <Image src={selectedVisual.src} alt={selected.title} fill sizes="(max-width: 760px) 100vw, 85vw" />
            </div>
            <div className="project-dialog__info">
              <div><p className="studio-kicker">{selected.category}</p><h2 id="project-dialog-title">{selected.title}</h2></div>
              <div>
                <p>{selected.description}</p>
                {selectedVisual.isConcept && (
                  <p className="project-dialog__disclosure">
                    Bu kayıt, görsel yönü göstermek için hazırlanmış bir konsepttir; gerçek müşteri işi değildir.
                    {selectedVisual.isStock ? " Fotoğraf Pexels kaynaklı temsilî bir görseldir." : " Grafik bu site için tasarlanmıştır."}
                  </p>
                )}
                <a href="#iletisim" onClick={() => { contactRequested.current = true; closeProject(); }}>Benzer bir projeyi konuşalım <ArrowUpRight size={17} /></a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
