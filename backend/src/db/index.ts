import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { config } from "../config/env";
import * as usersSchema from "./schema/users";
import * as documentsSchema from "./schema/documents";
import * as documentTypesSchema from "./schema/documentTypes";

const poolConnection = mysql.createPool(config.dbUrl);

export const db = drizzle(poolConnection, { 
  schema: { 
    ...usersSchema,
    ...documentsSchema,
    ...documentTypesSchema,
  },
  mode: "default"
});