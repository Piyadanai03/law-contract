import { drizzle } from 'drizzle-orm/mysql2'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import mysql from 'mysql2/promise'

async function runMigration() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL as string)

  const db = drizzle(connection)

  console.log('Running migrations...')
  
  await migrate(db, {
    migrationsFolder: './drizzle',
  })
  
  console.log('Migrations completed!')
  await connection.end()
}

runMigration().catch(console.error)