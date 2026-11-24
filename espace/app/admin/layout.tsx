import { TabBar } from "@/components/nav";
import { IHome, IUsers, IBowl, IBook, ICog } from "@/components/icons";
import { logout } from "@/app/actions/auth";

// Thème clair. La vérification (session, double authentification) se fait dans chaque page avec requireAdmin().
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin">
      <header className="top"><div className="in">
        <img src="/logo.png" alt="GM Sport et Nutrition" width={61} height={40} />
        <b style={{ flex: 1 }}>Back-office</b>
        <form action={logout}><button className="btn ghost small">Déconnexion</button></form>
      </div></header>
      <TabBar label="Back-office" items={[
        { href: "/admin", label: "Accueil", icon: <IHome />, exact: true },
        { href: "/admin/patientes", label: "Patientes", icon: <IUsers /> },
        { href: "/admin/recettes", label: "Recettes", icon: <IBowl /> },
        { href: "/admin/ressources", label: "Ressources", icon: <IBook /> },
        { href: "/admin/parametres", label: "Réglages", icon: <ICog /> }
      ]} />
      <main className="wrap" id="contenu">{children}</main>
    </div>
  );
}
