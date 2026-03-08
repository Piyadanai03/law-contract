import { z } from "zod";

export const createDocumentSchema = z.object({
  document_type_id: z.number().int().positive(),
  data: z.record(z.any()),
});
