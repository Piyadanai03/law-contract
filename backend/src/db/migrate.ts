// src/db/migrate.ts
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import { config } from '../config/env';

async function runMigration() {
  const connection = await mysql.createConnection(config.dbUrl);
  const db = drizzle(connection);
  
  await migrate(db, {
    migrationsFolder: './drizzle',
  });
  
  await connection.end();
}

runMigration().catch((err) => {
  console.error(err);
  process.exit(1);
});