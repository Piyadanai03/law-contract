import { db } from "../../db";
import { documentTypes } from "../../db/schema/documentTypes";
import { eq } from "drizzle-orm";

export const docTypeService = {
  async getAllTypes() {
    return await db.select({
      id: documentTypes.id,
      name: documentTypes.name,
    }).from(documentTypes);
  },

  async getTypeById(id: number) {
    const result = await db.select({
      id: documentTypes.id,
      name: documentTypes.name,
    }).from(documentTypes).where(eq(documentTypes.id, id));
    
    return result[0] || null;
  }
};