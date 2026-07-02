import { Router } from "express";
import multer from "multer";
import path from "path";
import { documentController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { uploadDocumentSchema, updateDocumentSchema, verifyDocumentSchema } from "./validation";

const upload = multer({ 
  dest: path.join(process.cwd(), "uploads")
});

const router = Router();

router.post("/upload", authenticate, authorize("Document.Create"), upload.single("file"), validate(uploadDocumentSchema), documentController.upload);
router.get("/", authenticate, documentController.list);
router.get("/:id", authenticate, documentController.getById);
router.get("/client/:clientId", authenticate, documentController.byClient);
router.get("/policy/:policyId", authenticate, documentController.byPolicy);
router.patch("/:id", authenticate, authorize("Document.Update"), validate(updateDocumentSchema), documentController.update);
router.delete("/:id", authenticate, authorize("Document.Delete"), documentController.remove);
router.post("/:id/verify", authenticate, authorize("Document.Create"), validate(verifyDocumentSchema), documentController.verify);

export default router;
