import { ChevronDown } from "lucide-react";
import { ProjectForm } from "@/components/features/admin/project-form";
import { setProjectActiveAction } from "@/server/actions/content.actions";
import { contentService } from "@/server/services/content.service";

export const metadata = {
  title: "Portföy | BK Media House",
};

export default async function AdminProjectsPage() {
  const projects = await contentService.getProjects(false);

  return (
    <>
      <div className="admin-page-heading">
        <div><h1>Portföy</h1><p>İşlerini ekle, düzenle ve ana sayfada göster.</p></div>
      </div>
      <ProjectForm />
      <section className="admin-card">
        <h2 className="admin-section-title">Tüm projeler <span>{projects.length} kayıt</span></h2>
        {projects.length === 0 ? (
          <div className="admin-empty"><div><strong>Henüz proje yok</strong>Yukarıdaki formdan ilk işi ekle.</div></div>
        ) : projects.map((project) => (
          <details className="admin-disclosure" key={project.id}>
            <summary>
              <span className="admin-disclosure__name"><strong>{project.title}</strong><small>{project.category} · /{project.slug}</small></span>
              <span className="admin-action-row">
                <span className={project.isActive ? "status-pill status-pill--active" : "status-pill status-pill--archived"}>
                  {project.isActive ? "Yayında" : "Gizli"}
                </span>
                <ChevronDown size={15} />
              </span>
            </summary>
            <div className="admin-disclosure__content">
              <ProjectForm project={project} compact />
              <form className="admin-inline-form" action={setProjectActiveAction.bind(null, project.id, !project.isActive)}>
                <button className="admin-button admin-button--subtle admin-button--small" type="submit">
                  {project.isActive ? "Yayından kaldır" : "Yayına al"}
                </button>
              </form>
            </div>
          </details>
        ))}
      </section>
    </>
  );
}
