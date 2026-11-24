import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { ReactNode } from "react";

// Rendu minimal des textes juridiques (content/legal/*.md) : titres, paragraphes, listes, tableaux, gras, italique, liens.
// Tout passe par React (échappé) ; un texte entre crochets dans des accents graves reste visible comme emplacement à compléter.

export const legalText = (name: string) => fs.readFileSync(path.join(process.cwd(), "content", "legal", name), "utf8");

function inline(text: string, key = 0): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|\*[^*\s][^*]*\*)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0], k = `${key}-${i++}`;
    if (t.startsWith("**")) out.push(<b key={k}>{inline(t.slice(2, -2), i)}</b>);
    else if (t.startsWith("`")) out.push(t.slice(1, -1).startsWith("[") ? <span key={k} className="placeholder">{t.slice(1, -1)}</span> : <code key={k}>{t.slice(1, -1)}</code>);
    else if (t.startsWith("[")) {
      const [, label, href] = t.match(/^\[([^\]]+)\]\(([^)]+)\)$/)!;
      out.push(href.startsWith("/") ? <Link key={k} href={href}>{label}</Link> : <a key={k} href={href} target="_blank" rel="noopener">{label}</a>);
    } else out.push(<em key={k}>{inline(t.slice(1, -1), i)}</em>);
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n"), blocks: ReactNode[] = [];
  for (let i = 0; i < lines.length;) {
    const l = lines[i];
    if (!l.trim() || /^---+$/.test(l.trim())) { i++; continue; }
    const h = l.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = Math.min(4, h[1].length + 1), content = inline(h[2], i);
      blocks.push(level === 2 ? <h2 key={i}>{content}</h2> : level === 3 ? <h3 key={i}>{content}</h3> : <h4 key={i}>{content}</h4>);
      i++; continue;
    }
    if (l.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|[\s:|-]+\|$/.test(lines[i].trim())) rows.push(lines[i].trim().slice(1, -1).split("|").map(c => c.trim()));
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={i} className="scroll"><table className="cards">
          <thead><tr>{head.map((c, j) => <th key={j}>{inline(c, j)}</th>)}</tr></thead>
          <tbody>{body.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j} data-label={head[j]?.replace(/[*`]/g, "")}>{inline(c, j)}</td>)}</tr>)}</tbody>
        </table></div>);
      continue;
    }
    if (/^\s*- /.test(l)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*- /.test(lines[i])) items.push(lines[i++].replace(/^\s*- /, ""));
      blocks.push(<ul key={i}>{items.map((t, j) => <li key={j}>{inline(t, j)}</li>)}</ul>);
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#|\||\s*- )/.test(lines[i])) para.push(lines[i++]);
    blocks.push(<p key={i}>{inline(para.join(" "), i)}</p>);
  }
  return <>{blocks}</>;
}

/** Page juridique publique (lisible sans compte). */
export function LegalPage({ title, file }: { title: string; file: string }) {
  return (
    <main className="auth" style={{ placeItems: "start center" }}>
      <article className="card legaltext" style={{ maxWidth: 760 }}>
        <p><Link href="/connexion">← Mon espace</Link></p>
        <h1>{title}</h1>
        <Markdown text={legalText(file)} />
        <p className="muted" style={{ fontSize: 14, marginTop: 24 }}>
          <Link href="/mentions-legales">Mentions légales</Link> · <Link href="/confidentialite">Confidentialité</Link> · <Link href="/conditions">Conditions d&apos;utilisation</Link>
        </p>
      </article>
    </main>
  );
}
