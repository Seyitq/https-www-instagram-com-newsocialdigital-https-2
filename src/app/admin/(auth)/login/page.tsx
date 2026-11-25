import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/features/admin/login-form";
import { getServerEnv } from "@/env";

export const metadata = {
  title: "Yönetici girişi | BK Media House",
};

export default function AdminLoginPage() {
  const env = getServerEnv();
  const configured = Boolean(env.ADMIN_EMAIL && env.ADMIN_PASSWORD_HASH);

  return (
    <main className="admin-login-page">
      <section className="admin-login-box" aria-labelledby="admin-login-title">
        <div className="admin-brand">
          <span className="admin-brand__symbol">NS</span>
          <span className="admin-brand__text">BK Media House<small>Yönetici girişi</small></span>
        </div>
        <h1 id="admin-login-title">Yönetici girişi</h1>
        <p>Site içeriğini ve gelen proje taleplerini yönet.</p>
        <LoginForm configured={configured} />
        <Link className="admin-back-link" href="/"><ArrowLeft size={14} /> Siteye dön</Link>
      </section>
    </main>
  );
}
