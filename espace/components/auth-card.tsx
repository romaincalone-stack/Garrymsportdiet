import Link from "next/link";

export function AuthCard({ title, lead, children, foot }: { title: string; lead?: string; children: React.ReactNode; foot?: React.ReactNode }) {
  return (
    <main className="auth">
      <div className="card">
        <img className="logo" src="/logo.png" alt="GM Sport et Nutrition" width={97} height={64} />
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
        {foot && <div className="foot">{foot}</div>}
      </div>
    </main>
  );
}
export const BackToLogin = () => <Link href="/connexion">Retour à la connexion</Link>;
