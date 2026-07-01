import { Router } from "express";
import { clientController } from "./client.controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createClientSchema, updateClientSchema } from "./client.validation";

const router = Router();

router.post("/", authenticate, authorize(["ADMIN", "MANAGER", "AGENT"]), validate(createClientSchema), clientController.create);
router.get("/", authenticate, clientController.list);
router.get("/search", authenticate, clientController.list);
router.get("/:id", authenticate, clientController.getById);
router.patch("/:id", authenticate, authorize(["ADMIN", "MANAGER", "AGENT"]), validate(updateClientSchema), clientController.update);
router.delete("/:id", authenticate, authorize(["ADMIN", "MANAGER"]), clientController.remove);

export default router;
