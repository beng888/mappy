// src/lib/db/index.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

// Use /tmp for SQLite on Render (ephemeral but writable)
// Note: Data will be lost on restart, consider PostgreSQL for production
const dbPath =
  process.env.NODE_ENV === "production"
    ? path.join("/tmp", "sqlite.db")
    : path.join(process.cwd(), "sqlite.db");

console.log("Using database at:", dbPath);

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database
const sqlite = new Database(dbPath);

// Enable foreign keys
sqlite.exec("PRAGMA foreign_keys = ON;");

export const db = drizzle(sqlite, { schema });
