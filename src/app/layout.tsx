import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { COMPANY } from "@/lib/company";
import "./globals.css";

const bodyFont = localFont({
  src: "../../public/fonts/manrope-variable.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "200 800",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: COMPANY.colors.secondary,
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.domain),
  title: { default: `${COMPANY.name} | Konya Sosyal Medya Ajansı`, template: `%s | ${COMPANY.name}` },
  description: COMPANY.description,
  applicationName: COMPANY.name,
  keywords: ["Konya sosyal medya ajansı", "video çekimi", "fotoğraf çekimi", "sosyal medya yönetimi", "web tasarım", "grafik tasarım", "dijital reklam"],
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${COMPANY.name} | Konya Sosyal Medya Ajansı`,
    description: COMPANY.description,
    url: COMPANY.domain,
    siteName: COMPANY.name,
    locale: "tr_TR",
    type: "website",
    images: [{ url: COMPANY.logo, width: 1200, height: 630, alt: `${COMPANY.name} logosu` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Konya Sosyal Medya Ajansı`,
    description: COMPANY.description,
    images: [COMPANY.logo],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon-512.png", type: "image/png", sizes: "512x512" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY.name,
    url: COMPANY.domain,
    description: COMPANY.description,
    telephone: COMPANY.phoneDisplay,
    email: COMPANY.email,
    areaServed: COMPANY.serviceArea,
    logo: new URL(COMPANY.logo, COMPANY.domain).toString(),
    sameAs: [COMPANY.instagram],
  };

  return (
    <html lang="tr" className={bodyFont.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
