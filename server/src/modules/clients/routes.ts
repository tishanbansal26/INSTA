import { Router } from "express";
import { clientController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createClientSchema, updateClientSchema } from "./validation";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("Client.Read"),
  validate(createClientSchema),
  clientController.create
);
router.get("/", authenticate, clientController.list);
router.get("/search", authenticate, clientController.search);
router.get("/:id", authenticate, clientController.getById);
router.patch(
  "/:id",
  authenticate,
  authorize("Client.Read"),
  validate(updateClientSchema),
  clientController.update
);
router.delete("/:id", authenticate, authorize("Client.Delete"), clientController.remove);

export default router;
