import { Router } from "express";
import { quotationController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createQuotationSchema, updateQuotationSchema } from "./validation";

const router = Router();

router.post("/", authenticate, authorize("Quotation.Create"), validate(createQuotationSchema), quotationController.create);
router.get("/", authenticate, quotationController.list);
router.get("/:id", authenticate, quotationController.getById);
router.patch("/:id", authenticate, authorize("Quotation.Update"), validate(updateQuotationSchema), quotationController.update);
router.delete("/:id", authenticate, authorize("Quotation.Delete"), quotationController.remove);
router.post("/:id/approve", authenticate, authorize("Quotation.Create"), quotationController.approve);
router.post("/:id/reject", authenticate, authorize("Quotation.Create"), quotationController.reject);
router.post("/:id/convert-policy", authenticate, authorize("Quotation.Create"), quotationController.convertToPolicy);

export default router;
