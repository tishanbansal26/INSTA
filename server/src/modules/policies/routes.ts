import { Router } from "express";
import { policyController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createPolicySchema, updatePolicySchema } from "./validation";

const router = Router();

router.post("/", authenticate, authorize("Policy.Create"), validate(createPolicySchema), policyController.create);
router.get("/", authenticate, policyController.list);
router.get("/client/:clientId", authenticate, policyController.byClient);
router.get("/expiring", authenticate, policyController.expiring);
router.get("/search", authenticate, policyController.search);
router.get("/:id", authenticate, policyController.getById);
router.patch("/:id", authenticate, authorize("Policy.Update"), validate(updatePolicySchema), policyController.update);
router.delete("/:id", authenticate, authorize("Policy.Delete"), policyController.remove);

export default router;
