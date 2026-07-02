import { Router } from "express";
import { planController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createPlanSchema, updatePlanSchema } from "./validation";

const router = Router();

router.post("/", authenticate, authorize("Plan.Create"), validate(createPlanSchema), planController.create);
router.get("/", authenticate, planController.list);
router.get("/:id", authenticate, planController.getById);
router.patch("/:id", authenticate, authorize("Plan.Update"), validate(updatePlanSchema), planController.update);
router.delete("/:id", authenticate, authorize("Plan.Delete"), planController.remove);

export default router;
