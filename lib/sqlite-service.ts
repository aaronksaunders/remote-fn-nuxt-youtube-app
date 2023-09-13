import Database from "better-sqlite3";

const db = new Database("stuff.db");
db.pragma("journal_mode = WAL");

const createTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS stuff (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stuff TEXT NOT NULL,
      important BOOL
    );
  `);

createTable.run();

export { db };