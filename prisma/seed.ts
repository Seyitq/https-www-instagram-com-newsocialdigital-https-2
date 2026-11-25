import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || "file:./prisma/dev.db",
  }),
});

const services = [
  { title: "Video çekimi", slug: "video-cekimi", description: "Marka tanıtımı, reklam, tanıtım film, etkinlik ve sosyal medya için profesyonel video prodüksiyonları.", iconName: "clapperboard", sortOrder: 1 },
  { title: "Fotoğraf çekimi", slug: "fotograf-cekimi", description: "Ürün, marka, kurumsal portre, mekan ve etkinlik çekimleriyle tutarlı görsel içerik.", iconName: "camera", sortOrder: 2 },
  { title: "Sosyal medya yönetimi", slug: "sosyal-medya-yonetimi", description: "İçerik planı, üretim, yayın akışı, topluluk yönetimi ve performans takibi.", iconName: "layers", sortOrder: 3 },
  { title: "Web tasarımı", slug: "web-tasarimi", description: "Kurumsal kimliğe uygun hızlı, mobil uyumlu ve dönüşüme odaklı web siteleri.", iconName: "pen-tool", sortOrder: 4 },
  { title: "Grafik tasarım", slug: "grafik-tasarim", description: "Logo, kurumsal kimlik, sosyal medya postları, katalog ve kampanya görsel tasarımları.", iconName: "sparkles", sortOrder: 5 },
  { title: "Dijital reklam", slug: "dijital-reklam", description: "Meta ve Google reklamları için hedefleme, kreatif üretim, kampanya kurulumu ve optimizasyon.", iconName: "megaphone", sortOrder: 6 },
  { title: "Marka danışmanlığı", slug: "marka-danismanligi", description: "Marka stratejisi, iletişim dili, kreatif yön ve dijital görünürlük planlaması.", iconName: "pen-tool", sortOrder: 7 },
];

const projects = [
  { title: "Interkonya", slug: "interkonya", category: "Marka iletişimi", description: "Interkonya için dijital iletişim ve marka içerik çalışmaları.", imageUrl: "/ortaklar/interkonya.jpeg", isFeatured: true, sortOrder: 1 },
  { title: "Key-Arma", slug: "key-arma", category: "Marka iletişimi", description: "Key-Arma için dijital içerik ve sosyal medya çalışmaları.", imageUrl: "/ortaklar/keyarma.jpeg", isFeatured: true, sortOrder: 2 },
  { title: "Konya Teknokent", slug: "konya-teknokent", category: "Kurumsal dijital", description: "Konya Teknokent için kurumsal dijital iletişim çalışmaları.", imageUrl: "/ortaklar/konyateknokent.jpeg", isFeatured: true, sortOrder: 3 },
  { title: "Konya ZMO", slug: "konya-zmo", category: "Kurumsal iletişim", description: "Konya ZMO için dijital iletişim ve içerik çalışmaları.", imageUrl: "/ortaklar/konyazmo.jpeg", isFeatured: true, sortOrder: 4 },
  { title: "Moodwings", slug: "moodwings", category: "Marka iletişimi", description: "Moodwings için dijital iletişim ve içerik çalışmaları.", imageUrl: "/ortaklar/moodwings.jpeg", isFeatured: true, sortOrder: 5 },
  { title: "Nefes Tarım Makina", slug: "nefes-tarim-makina", category: "Kurumsal iletişim", description: "Nefes Tarım Makina için marka ve dijital iletişim çalışmaları.", imageUrl: "/ortaklar/nefes tarım makina.jpeg", isFeatured: true, sortOrder: 6 },
  { title: "Newkon", slug: "newkon", category: "Marka iletişimi", description: "Newkon için dijital içerik ve marka iletişim çalışmaları.", imageUrl: "/ortaklar/newkon.png", isFeatured: true, sortOrder: 7 },
  { title: "Öz Çikolata", slug: "oz-cikolata", category: "Marka iletişimi", description: "Öz Çikolata için dijital iletişim ve içerik çalışmaları.", imageUrl: "/ortaklar/ozzchocalte.png", isFeatured: true, sortOrder: 8 },
  { title: "Dacka", slug: "dacka", category: "Marka iletişimi", description: "Dacka için dijital iletişim ve marka içerik çalışmaları.", imageUrl: "/ortaklar/images (13).jpeg", isFeatured: true, sortOrder: 9 },
  { title: "Tiny Napoli", slug: "tiny-napoli", category: "Marka iletişimi", description: "Tiny Napoli için dijital iletişim ve marka içerik çalışmaları.", imageUrl: "/ortaklar/images.jpeg", isFeatured: true, sortOrder: 10 },
];

async function main() {
  for (const service of services) {
    await prisma.service.upsert({ where: { slug: service.slug }, update: service, create: service });
  }
  await prisma.service.updateMany({ where: { slug: { in: ["marka-urun-cekimi", "video-produksiyon", "yapay-zeka-icerikleri", "marka-tasarimi", "sosyal-medya"] } }, data: { isActive: false } });
  for (const project of projects) {
    await prisma.project.upsert({ where: { slug: project.slug }, update: project, create: project });
  }
  await prisma.project.updateMany({ where: { slug: { in: ["marka-produksiyon", "mekan-lansmani", "sosyal-kampanya", "lider-tarim", "inter-academy", "gokler-insaat-yapi"] } }, data: { isActive: false } });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
