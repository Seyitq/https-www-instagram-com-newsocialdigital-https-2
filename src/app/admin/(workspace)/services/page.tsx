import { ChevronDown } from "lucide-react";
import { ServiceForm } from "@/components/features/admin/service-form";
import { setServiceActiveAction } from "@/server/actions/content.actions";
import { contentService } from "@/server/services/content.service";

export const metadata = {
  title: "Hizmetler | BK Media House",
};

export default async function AdminServicesPage() {
  const services = await contentService.getServices(false);

  return (
    <>
      <div className="admin-page-heading">
        <div><h1>Hizmetler</h1><p>Ana sayfada görünecek hizmetleri ve açıklamalarını düzenle.</p></div>
      </div>
      <ServiceForm />
      <section className="admin-card">
        <h2 className="admin-section-title">Tüm hizmetler <span>{services.length} kayıt</span></h2>
        {services.length === 0 ? (
          <div className="admin-empty"><div><strong>Henüz hizmet eklenmedi</strong>Yukarıdaki formdan ilk hizmeti ekle.</div></div>
        ) : services.map((service) => (
          <details className="admin-disclosure" key={service.id}>
            <summary>
              <span className="admin-disclosure__name"><strong>{service.title}</strong><small>/{service.slug}</small></span>
              <span className="admin-action-row">
                <span className={service.isActive ? "status-pill status-pill--active" : "status-pill status-pill--archived"}>
                  {service.isActive ? "Yayında" : "Gizli"}
                </span>
                <ChevronDown size={15} />
              </span>
            </summary>
            <div className="admin-disclosure__content">
              <ServiceForm service={service} compact />
              <form className="admin-inline-form" action={setServiceActiveAction.bind(null, service.id, !service.isActive)}>
                <button className="admin-button admin-button--subtle admin-button--small" type="submit">
                  {service.isActive ? "Yayından kaldır" : "Yayına al"}
                </button>
              </form>
            </div>
          </details>
        ))}
      </section>
    </>
  );
}
