import { db } from "../../db";
import { documents } from "../../db/schema/documents";
import { eq } from "drizzle-orm";

export const docService = {
    async createDocument(documentTypeId: number, data: any) {
        const result = await db.insert(documents).values({
            document_type_id: documentTypeId,
            data: data,
        }).$returningId();

        return result[0];
    },

    async getDocumentById(id: number) {
        const result = await db.select().from(documents).where(eq(documents.id, id));
        return result[0] || null;
    },

    async getAllDocuments() {
        const result = await db.select().from(documents);
        return result;
    }
};