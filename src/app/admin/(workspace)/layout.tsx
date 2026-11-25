import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { AdminNav } from "@/components/features/admin/admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminWorkspaceLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <Link className="admin-brand" href="/admin">
            <span className="admin-brand__symbol">BK</span>
            <span className="admin-brand__text">BK Media House<small>İçerik yönetimi</small></span>
          </Link>
          <p className="admin-nav-label">YÖNETİM</p>
          <AdminNav />
          <div className="admin-sidebar__bottom">
            <Link href="/" target="_blank"><ArrowUpRight size={16} /> Siteyi görüntüle</Link>
            <form action={signOutAction}>
              <button type="submit"><LogOut size={16} /> Çıkış yap</button>
            </form>
          </div>
        </aside>
        <div className="admin-main">
          <header className="admin-topbar">
            <span className="admin-topbar__crumb">BK Media House / Yönetim</span>
            <span className="admin-topbar__user">
              <span className="admin-topbar__avatar">BK</span>
              {session.user.email}
            </span>
          </header>
          <div className="admin-content">{children}</div>
        </div>
      </div>
    </div>
  );
}
