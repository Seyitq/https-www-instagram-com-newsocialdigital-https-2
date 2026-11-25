import { InquiryStatusSelect } from "@/components/features/admin/inquiry-status-select";
import { inquiryService } from "@/server/services/inquiry.service";

export const metadata = {
  title: "Talepler | BK Media House",
};

const statusLabel = {
  NEW: "Yeni",
  CONTACTED: "İletişime geçildi",
  ARCHIVED: "Arşivlendi",
} as const;

export default async function AdminInquiriesPage() {
  const inquiries = await inquiryService.getAll();

  return (
    <>
      <div className="admin-page-heading">
        <div><h1>Proje talepleri</h1><p>İletişim formundan gelen mesajları incele ve durumlarını güncelle.</p></div>
      </div>
      <section className="admin-card">
        <h2 className="admin-section-title">Tüm talepler <span>{inquiries.length} kayıt</span></h2>
        {inquiries.length === 0 ? (
          <div className="admin-empty"><div><strong>Henüz talep yok</strong>Yeni mesaj geldiğinde bu listede görünecek.</div></div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>İletişim</th><th>Hizmet</th><th>Mesaj</th><th>Tarih</th><th>Durum</th></tr></thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id}>
                    <td><strong>{inquiry.name}</strong><small>{inquiry.email}</small>{inquiry.company && <small>{inquiry.company}</small>}</td>
                    <td>{inquiry.service || "Belirtilmedi"}</td>
                    <td>{inquiry.message}</td>
                    <td>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(inquiry.createdAt)}</td>
                    <td><InquiryStatusSelect id={inquiry.id} initialStatus={inquiry.status as keyof typeof statusLabel} /></td>
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
