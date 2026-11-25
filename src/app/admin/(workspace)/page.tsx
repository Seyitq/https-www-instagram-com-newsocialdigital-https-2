import Link from "next/link";
import { ArrowRight, Boxes, BriefcaseBusiness, Inbox } from "lucide-react";
import { contentService } from "@/server/services/content.service";
import { inquiryService } from "@/server/services/inquiry.service";

export const metadata = {
  title: "Genel bakış | BK Media House",
};

export default async function AdminDashboardPage() {
  const [counts, inquiries] = await Promise.all([
    contentService.getDashboardCounts(),
    inquiryService.getAll(),
  ]);
  const latestInquiries = inquiries.slice(0, 5);

  return (
    <>
      <div className="admin-page-heading">
        <div>
          <h1>Genel bakış</h1>
          <p>Site içeriğini ve proje taleplerini buradan yönet.</p>
        </div>
      </div>
      <div className="admin-stats">
        <div className="admin-stat">
          <div><p>Yayındaki hizmetler</p><strong>{counts.services}</strong></div>
          <span className="admin-stat__icon"><Boxes size={19} /></span>
        </div>
        <div className="admin-stat">
          <div><p>Yayındaki portföy işleri</p><strong>{counts.projects}</strong></div>
          <span className="admin-stat__icon"><BriefcaseBusiness size={19} /></span>
        </div>
        <div className="admin-stat">
          <div><p>Yanıt bekleyen talepler</p><strong>{counts.inquiries}</strong></div>
          <span className="admin-stat__icon"><Inbox size={19} /></span>
        </div>
      </div>
      <div className="admin-shortcuts">
        <Link className="admin-shortcut" href="/admin/services">
          <span><strong>Hizmetleri düzenle</strong><span>Açıklamaları ve sıralamayı güncelle.</span></span>
          <ArrowRight size={16} />
        </Link>
        <Link className="admin-shortcut" href="/admin/projects">
          <span><strong>Portföye yeni iş ekle</strong><span>Projeleri yayına al veya düzenle.</span></span>
          <ArrowRight size={16} />
        </Link>
      </div>
      <section className="admin-card">
        <h2 className="admin-section-title">Son proje talepleri <Link href="/admin/inquiries">Tüm talepler <ArrowRight size={13} /></Link></h2>
        {latestInquiries.length === 0 ? (
          <div className="admin-empty"><div><strong>Henüz talep yok</strong>İletişim formundan gelen mesajlar burada görünecek.</div></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Ad</th><th>Hizmet</th><th>Tarih</th><th>Durum</th></tr></thead>
              <tbody>
                {latestInquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td><strong>{inquiry.name}</strong><small>{inquiry.email}</small></td>
                    <td>{inquiry.service || "Belirtilmedi"}</td>
                    <td>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(inquiry.createdAt)}</td>
                    <td><span className={inquiry.status === "ARCHIVED" ? "status-pill status-pill--archived" : "status-pill"}>{inquiry.status === "NEW" ? "Yeni" : inquiry.status === "CONTACTED" ? "İletişime geçildi" : "Arşivlendi"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
