// Applique les migrations SQL de db/migrations, dans l'ordre, une seule fois chacune.
// Usage : DATABASE_URL=postgres://… npm run db:migrate
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "db", "migrations");
const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
try {
  await client.query("create table if not exists schema_migrations (name text primary key, applied_at timestamptz not null default now())");
  const done = new Set((await client.query("select name from schema_migrations")).rows.map(r => r.name));
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith(".sql")).sort()) {
    if (done.has(file)) continue;
    await client.query("begin");
    try {
      await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
      await client.query("insert into schema_migrations (name) values ($1)", [file]);
      await client.query("commit");
      console.log("migration appliquée :", file);
    } catch (e) {
      await client.query("rollback");
      throw e;
    }
  }
  console.log("base à jour");
} finally {
  await client.end();
}
