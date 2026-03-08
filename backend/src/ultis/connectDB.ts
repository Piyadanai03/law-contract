import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

async function connectDB() {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL as string);
        return drizzle(connection);
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;
    }
}

export default connectDB;
