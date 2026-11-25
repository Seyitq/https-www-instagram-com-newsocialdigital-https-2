import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/company";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: COMPANY.domain,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
