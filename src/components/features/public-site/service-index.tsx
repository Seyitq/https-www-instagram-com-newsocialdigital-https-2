"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { z } from "zod";
import type { StudioServiceSchema } from "@/lib/validations/studio.schema";

const categories = ["Tüm hizmetler", "Prodüksiyon", "Dijital pazarlama", "Tasarım", "Yapay zekâ"] as const;

function categoryFor(icon: string, title: string) {
  const text = title.toLocaleLowerCase("tr");
  if (text.includes("zeka") || text.includes("zekâ") || icon === "sparkles") return "Yapay zekâ";
  if (text.includes("tasarım") || icon === "pen-tool") return "Tasarım";
  if (text.includes("sosyal") || text.includes("reklam") || ["layers", "megaphone"].includes(icon)) return "Dijital pazarlama";
  return "Prodüksiyon";
}

function serviceVisual(title: string) {
  const text = title.toLocaleLowerCase("tr");
  if (text.includes("video") || text.includes("podcast")) return "/images/services/video-production.webp";
  if (text.includes("fotoğraf") || text.includes("çekim") || text.includes("prodüksiyon")) return "/images/services/photo-production.webp";
  if (text.includes("sosyal medya")) return "/images/services/social-media.webp";
  if (text.includes("web") || text.includes("reklam") || text.includes("dijital")) {
    return text.includes("reklam") ? "/images/services/digital-advertising.webp" : "/images/services/web-design.webp";
  }
  if (text.includes("grafik") || text.includes("tasarım")) return "/images/services/graphic-design.webp";
  if (text.includes("marka") || text.includes("danışman")) return "/images/services/brand-consulting.webp";
  return "/images/services/brand-consulting.webp";
}

export function ServiceIndex({ services }: { services: z.infer<typeof StudioServiceSchema>[] }) {
  const [category, setCategory] = useState<string>(categories[0]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const visible = services.filter((service) => category === categories[0] || categoryFor(service.iconName, service.title) === category);

  return (
    <div className="service-catalog">
      <div className="service-filters" role="group" aria-label="Hizmet kategorileri">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls="service-results" onClick={() => { setCategory(item); setExpanded(null); }}>{item}</button>)}</div>
      <p className="service-count" role="status" aria-live="polite">{visible.length} hizmet{category !== categories[0] ? " · " + category : ""}</p>
      <div className="service-grid" id="service-results">
        {visible.map((service) => {
          const group = categoryFor(service.iconName, service.title);
          const isOpen = expanded === service.id;
          const visual = serviceVisual(service.title);
          return <article className="service-card" key={service.id}>
            <div className="service-card__media service-card__media--photo">
              <Image
                src={visual}
                alt={`${service.title} hizmeti için görsel`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 400px"
                loading="lazy"
              />
              <span className="media-disclosure">{group}</span>
            </div>
            <div className="service-card__body"><span className="service-card__category">{group}</span><h3>{service.title}</h3><p>{service.description}</p><button className="service-detail-link" type="button" aria-expanded={isOpen} aria-controls={"service-detail-" + service.id} onClick={() => setExpanded(isOpen ? null : service.id)}>{isOpen ? "Detayı kapat" : "Hizmeti incele"} <ArrowRight size={16} /></button>
              <div className="service-card__detail" id={"service-detail-" + service.id} hidden={!isOpen}><p>Kapsamı, teslim formatlarını ve yayın planını projenin ihtiyacına göre birlikte belirliyoruz.</p><a className="agency-text-link" href="#iletisim">Bu hizmet için teklif al <ArrowUpRight size={16} /></a></div>
            </div>
          </article>;
        })}
      </div>
      {visible.length === 0 && <p className="studio-muted">Bu kategoride henüz hizmet yayınlanmadı. İhtiyacını iletişim formundan paylaşabilirsin.</p>}
    </div>
  );
}
