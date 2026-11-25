import type { z } from "zod";
import { ServiceSchema } from "@/lib/validations/service.schema";
import { ProjectSchema } from "@/lib/validations/project.schema";
import { contentRepository } from "@/server/repositories/content.repository";

export const contentService = {
  getServices(activeOnly = true) {
    return contentRepository.listServices(activeOnly);
  },

  saveService(input: z.infer<typeof ServiceSchema>) {
    return contentRepository.saveService(input);
  },

  setServiceActive(id: string, isActive: boolean) {
    return contentRepository.setServiceActive(id, isActive);
  },

  getProjects(activeOnly = true) {
    return contentRepository.listProjects(activeOnly);
  },

  saveProject(input: z.infer<typeof ProjectSchema>) {
    return contentRepository.saveProject(input);
  },

  setProjectActive(id: string, isActive: boolean) {
    return contentRepository.setProjectActive(id, isActive);
  },

  getDashboardCounts() {
    return contentRepository.getDashboardCounts();
  },
};
