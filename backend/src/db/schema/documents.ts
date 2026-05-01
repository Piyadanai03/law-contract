import { mysqlTable, int, varchar, timestamp, json } from "drizzle-orm/mysql-core";
import { documentTypes } from "./documentTypes";

export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(),
  document_type_id: int("document_type_id") 
    .notNull()
    .references(() => documentTypes.id),
  data: json("data").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});