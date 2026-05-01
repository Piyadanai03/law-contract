import { Context } from "hono";
import { docTypeService } from "./type.service";

export const getAllDocumentTypes = async (c: Context) => {
  try {
    const data = await docTypeService.getAllTypes();
    return c.json({ message: "success", data });
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const getDocumentTypesById = async (c: Context) => {
  try {
    const typeId = Number(c.req.query("document_type_id"));
    
    if (!typeId || isNaN(typeId)) {
      return c.json({ error: "document_type_id is required and must be a number" }, 400);
    }

    const data = await docTypeService.getTypeById(typeId);
    
    if (!data) {
      return c.json({ error: "Document type not found" }, 404);
    }

    return c.json({ message: "success", data });
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
};