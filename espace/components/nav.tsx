"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string; icon: React.ReactNode; exact?: boolean };

/** Barre d'onglets : en bas sur téléphone, barre latérale (espace patiente) ou bandeau (back-office) sur ordinateur. */
export function TabBar({ items, logo, label }: { items: NavItem[]; logo?: string; label: string }) {
  const path = usePathname();
  return (
    <nav className="tabbar" aria-label={label}>
      {logo && <img className="tlogo" src={logo} alt="" width={73} height={48} />}
      {items.map(i => {
        const active = i.exact ? path === i.href : path === i.href || path.startsWith(i.href + "/");
        return <Link key={i.href} href={i.href} aria-current={active ? "page" : undefined}>{i.icon}<span>{i.label}</span></Link>;
      })}
    </nav>
  );
}
