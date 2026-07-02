import { Router } from "express";
import { premiumRateController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createPremiumRateSchema, updatePremiumRateSchema } from "./validation";

const router = Router();

router.post("/", authenticate, authorize("PremiumRate.Create"), validate(createPremiumRateSchema), premiumRateController.create);
router.get("/", authenticate, premiumRateController.list);
router.get("/:id", authenticate, premiumRateController.getById);
router.patch("/:id", authenticate, authorize("PremiumRate.Update"), validate(updatePremiumRateSchema), premiumRateController.update);
router.delete("/:id", authenticate, authorize("PremiumRate.Delete"), premiumRateController.remove);

export default router;
