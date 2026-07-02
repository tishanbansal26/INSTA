import { Router } from "express";
import { premiumController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { validate } from "../../shared/middleware/validate";
import { calculatePremiumSchema } from "./validation";

const router = Router();

router.post("/calculate", authenticate, validate(calculatePremiumSchema), premiumController.calculate);

export default router;
