"use client";

import Image from "next/image";
import { REFERENCES } from "@/lib/company";

export function ReferenceLogoCarousel() {
  const references = REFERENCES as readonly { name: string; logo: string; href?: string }[];
  const items = [...references, ...references];

  return (
    <section className="reference-strip" aria-labelledby="references-title">
      <div className="studio-shell reference-strip__heading">
        <p className="section-label">Referanslarımız</p>
        <h2 id="references-title">Bize güvenen markalar.</h2>
      </div>
      <div className="reference-carousel" role="region" aria-label="BK Media House referansları">
        <div className="reference-carousel__track">
          {items.map((reference, index) => {
            const content = reference.logo ? (
              <Image
                src={reference.logo}
                alt={`${reference.name} logosu`}
                width={180}
                height={72}
                sizes="180px"
                loading="lazy"
                className="reference-carousel__image"
              />
            ) : null;

            return reference.href ? (
              <a key={`${reference.name}-${index}`} href={reference.href} target="_blank" rel="noopener noreferrer" aria-label={`${reference.name} web sitesi`} className="reference-carousel__item">
                {content}
              </a>
            ) : (
              <span key={`${reference.name}-${index}`} className="reference-carousel__item" aria-label={reference.name}>
                {content}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
