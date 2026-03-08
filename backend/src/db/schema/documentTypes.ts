import {
    mysqlTable,
    int,
    varchar,
    timestamp,
} from "drizzle-orm/mysql-core";

export const documentTypes = mysqlTable("document_types", {
    id: int("id").autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    created_at: timestamp("created_at").defaultNow().notNull(),
});