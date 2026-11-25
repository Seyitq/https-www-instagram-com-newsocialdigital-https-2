import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MessagesSquare, ClipboardList, Camera, Send } from "lucide-react";
import { SiteHeader } from "@/components/features/public-site/site-header";
import { CinematicMedia } from "@/components/features/public-site/cinematic-media";
import { ContactForm } from "@/components/features/public-site/contact-form";
import { ProjectGallery } from "@/components/features/public-site/project-gallery";
import { ServiceIndex } from "@/components/features/public-site/service-index";
import { StudioProjectSchema, StudioServiceSchema } from "@/lib/validations/studio.schema";
import { WORKFLOW, getProjectVisual } from "@/lib/studio-content";
import { contentService } from "@/server/services/content.service";
import { getServerEnv } from "@/env";
import { COMPANY } from "@/lib/company";
import { ReferenceLogoCarousel } from "@/components/features/public-site/reference-logo-carousel";
import "./studio.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Konya Sosyal Medya Ajansı",
    description: "Konya’da video çekimi, fotoğraf çekimi, sosyal medya yönetimi, web tasarım ve dijital reklam hizmetleri.",
    alternates: { canonical: "/" },
    openGraph: {
      title: "BK Media House | Konya Sosyal Medya Ajansı",
      description: "Markanız için prodüksiyon, dijital iletişim ve yaratıcı ajans hizmetleri.",
      locale: "tr_TR",
      type: "website",
    },
  };
}

const stepIcons = [MessagesSquare, ClipboardList, Camera, Send];

export default async function HomePage() {
  const [serviceRecords, projectRecords] = await Promise.all([contentService.getServices(), contentService.getProjects()]);
  const services = StudioServiceSchema.array().parse(serviceRecords);
  const projects = StudioProjectSchema.array().parse(projectRecords);
  const hasConcepts = projects.some((project) => getProjectVisual(project.imageUrl).isConcept);
  const env = getServerEnv();

  return (
    <div className="studio-site">
      <SiteHeader />
      <main id="ana-icerik" tabIndex={-1}>
        <section className="agency-hero studio-shell" aria-labelledby="hero-title">
          <div className="agency-hero__copy">
            <p className="agency-eyebrow">BK MEDIA HOUSE — KONYA'DAN MARKA İLETİŞİMİ</p>
            <h1 id="hero-title">Markanızı görünür kılalım.</h1>
            <p className="agency-hero__description">Konya merkezli ajansımızda video çekimi, fotoğraf çekimi, sosyal medya, web tasarımı ve dijital reklam çalışmalarını tek stratejik akışta buluşturuyoruz.</p>
            <div className="agency-hero__actions">
              <a className="agency-button" href="#iletisim">Projeni konuşalım <ArrowUpRight size={18} /></a>
              <a className="agency-text-link" href="#isler">İşlerimizi keşfet <ArrowRight size={17} /></a>
            </div>
            <p className="agency-hero__footnote">Fikirden çekime, tasarımdan yayına.<br /><strong>İhtiyacın olan yaratıcı destek, tek ekipte.</strong></p>
          </div>
          <div className="hero-composition">
            <div className="hero-composition__main"><CinematicMedia videoSrc={env.STUDIO_REEL_URL} webmSrc="/video/BK_MediaHouse_Hero_720x900.webm" /></div>
            <figure className="hero-composition__inset">
              <div><Image src="/images/editorial/production.webp" alt="Çekimde kamera kullanan operatör; temsilî fotoğraf" fill sizes="(max-width: 600px) 38vw, 220px" /></div>
              <figcaption>Her detay, hikâyenin bir parçası.</figcaption>
            </figure>
            <span className="hero-composition__label">Fotoğraf & video prodüksiyon</span>
          </div>
        </section>

        <ReferenceLogoCarousel />

        <section className="agency-services agency-section" id="hizmetler" aria-labelledby="services-title" tabIndex={-1}>
          <div className="studio-shell">
            <div className="section-heading"><div><p className="section-label">Hizmetlerimiz</p><h2 id="services-title">Markanın ihtiyacına göre.</h2></div><p>Bir çekimden bütün bir kampanyaya,<br />doğru içerikle başlayalım.</p></div>
            <ServiceIndex services={services} />
          </div>
        </section>

        <section className="agency-work agency-section studio-shell" id="isler" aria-labelledby="work-title" tabIndex={-1}>
          <span id="portfoy" className="section-anchor" />
          <div className="section-heading"><div><p className="section-label">İşlerimiz</p><h2 id="work-title">Fikirlerin görünür hâli.</h2></div><a className="agency-text-link" href="#iletisim">Senin projenle devam edelim <ArrowUpRight size={17} /></a></div>
          {hasConcepts && <p className="work-disclosure">Aşağıdaki konsept çalışmalar görsel yaklaşımımızı gösterir; gerçek müşteri işi değildir.</p>}
          <ProjectGallery projects={projects} />
        </section>

        <section className="agency-about agency-section" id="studyo" aria-labelledby="about-title" tabIndex={-1}>
          <div className="studio-shell">
            <span id="hakkimizda" className="section-anchor" />
            <div className="agency-about__intro"><div><p className="section-label">Hakkımızda</p><h2 id="about-title">Strateji, prodüksiyon ve<br />dijital iletişimi bir arada.</h2></div><div><p>BK Media House, Konya merkezli sosyal medya ajansıdır; markalar için fikirden yayına bütüncül içerik üretir.</p><p>Video çekimi, fotoğraf çekimi, sosyal medya yönetimi, web tasarımı ve dijital reklam süreçlerini markanın hedeflerine göre planlar ve uygularız.</p></div></div>
            <div className="process-heading"><h3>Nasıl çalışıyoruz?</h3><p>İlk görüşmeden yayına, açık ve anlaşılır bir süreç.</p></div>
            <ol className="process-grid">{WORKFLOW.map((step, index) => { const Icon = stepIcons[index]; return <li key={step.title}><div className="process-step__top"><Icon size={22} strokeWidth={1.5} /><span>{String(index + 1).padStart(2, "0")}</span></div><h4>{step.title}</h4><p>{step.description}</p></li>; })}</ol>
          </div>
        </section>

        <section className="studio-contact agency-section" id="iletisim" aria-labelledby="contact-title" tabIndex={-1}>
          <div className="studio-shell studio-contact__body">
            <div className="studio-contact__intro"><p className="section-label">Birlikte başlayalım</p><h2 id="contact-title">Markanızın yeni hikâyesini birlikte yazalım.</h2><p>İhtiyacınızı anlatın; projenize uygun prodüksiyon, sosyal medya veya dijital çözümü belirleyelim.</p><a className="agency-text-link" href={COMPANY.instagram} target="_blank" rel="noopener noreferrer">{COMPANY.instagramHandle} <ArrowUpRight size={17} /></a><a className="agency-text-link" href={`mailto:${COMPANY.email}`}>{COMPANY.email} <ArrowUpRight size={17} /></a><a className="agency-text-link" href={COMPANY.phoneHref}>{COMPANY.phoneDisplay} <ArrowUpRight size={17} /></a><a className="agency-text-link" href={COMPANY.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={17} /></a><iframe className="studio-contact__map" src={COMPANY.mapEmbed} title="BK Media House konum haritası" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
            <ContactForm services={services.map((service) => service.title)} />
          </div>
        </section>
      </main>
      <footer className="agency-footer"><div className="studio-shell"><div className="agency-footer__top"><a className="agency-footer__brand" href="#ana-icerik" aria-label="BK Media House ana sayfa"><Image src={COMPANY.logo} alt="BK Media House" width={180} height={54} sizes="180px" /></a><p>Konya’da markalar için<br />strateji, prodüksiyon ve dijital iletişim.</p><nav aria-label="Alt menü"><a href="#hizmetler">Hizmetler</a><a href="#isler">Referanslar</a><a href="#iletisim">İletişim</a></nav><a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={15} /></a></div><div className="agency-footer__bottom"><span>© {new Date().getFullYear()} BK Media House. Tüm hakları saklıdır.</span><a href="#ana-icerik">Sayfa başına dön ↑</a></div></div></footer>
    </div>
  );
}
