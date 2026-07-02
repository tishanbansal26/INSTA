import { Router } from "express";
import { paymentController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createPaymentSchema, updatePaymentSchema } from "./validation";

const router = Router();

router.post("/", authenticate, authorize("Payment.Create"), validate(createPaymentSchema), paymentController.create);
router.get("/", authenticate, paymentController.list);
router.get("/policy/:policyId", authenticate, paymentController.byPolicy);
router.get("/client/:clientId", authenticate, paymentController.byClient);
router.get("/pending", authenticate, paymentController.pending);
router.get("/:id", authenticate, paymentController.getById);
router.patch("/:id", authenticate, authorize("Payment.Update"), validate(updatePaymentSchema), paymentController.update);
router.delete("/:id", authenticate, authorize("Payment.Delete"), paymentController.remove);

export default router;
