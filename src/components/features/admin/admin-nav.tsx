"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, BriefcaseBusiness, Inbox, LayoutDashboard } from "lucide-react";

const navigation = [
  { href: "/admin", label: "Genel bakış", icon: LayoutDashboard },
  { href: "/admin/services", label: "Hizmetler", icon: Boxes },
  { href: "/admin/projects", label: "Portföy", icon: BriefcaseBusiness },
  { href: "/admin/inquiries", label: "Talepler", icon: Inbox },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-nav" aria-label="Yönetim menüsü">
      {navigation.map(({ href, label, icon: Icon }) => {
        const current = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={current ? "page" : undefined}>
            <Icon aria-hidden="true" /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
