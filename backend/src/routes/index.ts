import { Hono } from "hono";
import { googleLogin, facebookLogin } from "../modules/auth/auth.controller";
import { addDocument } from "../modules/documents/doc.controller";
import { getAllDocument, getDocumentById } from "../modules/documents/doc.controller";
import { getAllDocumentTypes, getDocumentTypesById } from "../modules/document-types/type.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const apiRoutes = new Hono();

apiRoutes.post("/auth/google", googleLogin);
apiRoutes.post("/auth/facebook", facebookLogin);

apiRoutes.post("/documents", authMiddleware, addDocument);
apiRoutes.get("/documents", authMiddleware, getAllDocument);
apiRoutes.get("/documents/:id", authMiddleware, getDocumentById);

apiRoutes.get("/document-types", authMiddleware, getAllDocumentTypes);
apiRoutes.get("/document-types/:id", authMiddleware, getDocumentTypesById);

export default apiRoutes;