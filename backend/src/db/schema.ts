import {
  mysqlTable,
  int,
  varchar,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";

export const documentTypes = mysqlTable("document_types", {
  id: int("id").autoincrement().primaryKey(), 
  name: varchar("name", { length: 255 }).notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  document_type_id: int("document_type_id") 
    .notNull()
    .references(() => documentTypes.id),
  data: json("data").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(), 
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  picture: varchar("picture", { length: 512 }),
  google_id: varchar("google_id", { length: 255 }),
  facebook_id: varchar("facebook_id", { length: 255 }),
  created_at: timestamp("created_at").defaultNow().notNull(),
});