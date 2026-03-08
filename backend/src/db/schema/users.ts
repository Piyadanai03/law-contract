import { mysqlTable, int, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    picture: varchar("picture", { length: 512 }),
    google_id: varchar("google_id", { length: 255 }),
    facebook_id: varchar("facebook_id", { length: 255 }),
    created_at: timestamp("created_at").defaultNow().notNull(),
});