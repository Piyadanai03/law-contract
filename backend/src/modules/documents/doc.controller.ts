import { Context } from "hono";
import { docService } from "./doc.service";
import { createDocumentSchema } from "./doc.schema";

export const addDocument = async (c: Context) => {
    try {
        const body = await c.req.json();
        const parsed = createDocumentSchema.safeParse(body);

        if (!parsed.success) {
            return c.json({ error: "Invalid Data", details: parsed.error.format() }, 400);
        }

        const result = await docService.createDocument(
            parsed.data.document_type_id,
            parsed.data.data
        );

        return c.json({ message: "success", data: result });
    } catch (error) {
        console.error("Add Document Error:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
};

export const getDocumentById = async (c: Context) => {
    try {
        const documentId = Number(c.req.param("id"));
        if (!documentId || isNaN(documentId)) {
            return c.json({ error: "document_id is required and must be a number" }, 400);
        }

        const data = await docService.getDocumentById(documentId);

        if (!data) {
            return c.json({ error: "Document not found" }, 404);
        }

        return c.json({ message: "success", data });
    } catch (error) {
        console.error("Get Document Error:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
};

export const getAllDocument = async (c: Context) => {
    try {
        const data = await docService.getAllDocuments();
        return c.json({ message: "success", data });
    } catch (error) {
        console.error("Get All Documents Error:", error);
        return c.json({ error: "Internal Server Error" }, 500);
    }
};