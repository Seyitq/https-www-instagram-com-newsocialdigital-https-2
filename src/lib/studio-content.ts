export const STUDIO_POSTER = "/video/unnamed.webp";

export const SERVICE_VISUALS: Record<string, { image: string; caption: string; detail: string }> = {
  camera: {
    image: "/images/editorial/production.webp",
    caption: "Fotoğraf / Prodüksiyon",
    detail: "Ürün, marka ve mekân çekimleri.",
  },
  clapperboard: {
    image: STUDIO_POSTER,
    caption: "Hareket / Hikâye",
    detail: "Fikir, çekim, kurgu ve renk.",
  },
  sparkles: {
    image: "/images/editorial/new-perspective.svg",
    caption: "Deney / Yeni olasılıklar",
    detail: "Markaya özel görsel ve video denemeleri.",
  },
  "pen-tool": {
    image: "/images/editorial/new-perspective.svg",
    caption: "Kimlik / Görsel dil",
    detail: "Kimlik, art direction ve dijital tasarım.",
  },
  megaphone: {
    image: "/images/editorial/architecture.webp",
    caption: "Kreatif / Doğru kitle",
    detail: "Reklam kreatifleri, kampanya ve optimizasyon.",
  },
  layers: {
    image: "/images/editorial/production.webp",
    caption: "İçerik / Devamlılık",
    detail: "İçerik planı, üretim ve yayın yönetimi.",
  },
};

const CONCEPT_VISUALS: Record<string, string> = {
  "/images/project-production.webp": "/images/editorial/production.webp",
  "/images/project-launch.webp": "/images/editorial/architecture.webp",
  "/images/project-social.webp": "/images/editorial/social-study.svg",
};

export function getProjectVisual(imageUrl: string) {
  return {
    src: CONCEPT_VISUALS[imageUrl] ?? imageUrl,
    isConcept: Object.hasOwn(CONCEPT_VISUALS, imageUrl),
    isStock: imageUrl === "/images/project-production.webp" || imageUrl === "/images/project-launch.webp",
  };
}

export const WORKFLOW = [
  {
    title: "Tanışıyoruz",
    description: "Önce seni dinliyoruz. Markanı, hedef kitleni ve çözmek istediğin meseleyi birlikte anlıyoruz.",
    output: "Net bir brief",
  },
  {
    title: "Planlıyoruz",
    description: "Ne anlatacağımızı, nasıl anlatacağımızı ve hangi kanalda buluşacağımızı belirliyoruz.",
    output: "Yaratıcı yön ve plan",
  },
  {
    title: "Üretiyoruz",
    description: "Fikri sete, tasarıma ve kurguya taşıyoruz. Her kareyi aynı yaratıcı bakışla bir araya getiriyoruz.",
    output: "Yayına hazır içerik",
  },
  {
    title: "Yayına alıyoruz",
    description: "İçeriği doğru formatlarda yayına alıyor, geri bildirimleri izleyip bir sonraki adımı şekillendiriyoruz.",
    output: "Takip ve iyileştirme",
  },
] as const;
