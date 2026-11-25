import { prisma } from "@/server/db/prisma";
import type { ServiceSchema } from "@/lib/validations/service.schema";
import type { ProjectSchema } from "@/lib/validations/project.schema";
import type { z } from "zod";

type ServiceInput = z.infer<typeof ServiceSchema>;
type ProjectInput = z.infer<typeof ProjectSchema>;

export const contentRepository = {
  listServices(activeOnly = true) {
    return prisma.service.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  },

  saveService(input: ServiceInput) {
    const { id, ...data } = input;
    if (id) return prisma.service.update({ where: { id }, data });
    return prisma.service.create({ data });
  },

  setServiceActive(id: string, isActive: boolean) {
    return prisma.service.update({ where: { id }, data: { isActive } });
  },

  listProjects(activeOnly = true) {
    return prisma.project.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  },

  saveProject(input: ProjectInput) {
    const { id, ...data } = input;
    if (id) return prisma.project.update({ where: { id }, data });
    return prisma.project.create({ data });
  },

  setProjectActive(id: string, isActive: boolean) {
    return prisma.project.update({ where: { id }, data: { isActive } });
  },

  async getDashboardCounts() {
    const [services, projects, inquiries] = await Promise.all([
      prisma.service.count({ where: { isActive: true } }),
      prisma.project.count({ where: { isActive: true } }),
      prisma.inquiry.count({ where: { status: "NEW" } }),
    ]);
    return { services, projects, inquiries };
  },
};
