import { TabBar } from "@/components/nav";
import { IHome, IBowl, ICart, IBook, IUser } from "@/components/icons";

// La vérification de session se fait dans chaque page (requirePatient) : un layout n'est pas réévalué à chaque navigation.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app">
      <header className="top"><img src="/logoclair.png" alt="GM Sport et Nutrition" width={61} height={40} /></header>
      <main className="wrap" id="contenu">{children}</main>
      <TabBar label="Rubriques" logo="/logoclair.png" items={[
        { href: "/espace", label: "Accueil", icon: <IHome />, exact: true },
        { href: "/espace/recettes", label: "Recettes", icon: <IBowl /> },
        { href: "/espace/courses", label: "Courses", icon: <ICart /> },
        { href: "/espace/ressources", label: "Ressources", icon: <IBook /> },
        { href: "/espace/profil", label: "Profil", icon: <IUser /> }
      ]} />
    </div>
  );
}
