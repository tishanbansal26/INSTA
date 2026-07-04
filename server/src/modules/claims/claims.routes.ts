import { Router } from "express";
import { claimsController } from "./claims.controller";
import { authenticate } from "../../shared/middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", claimsController.list);
router.get("/:id", claimsController.getById);
router.post("/", claimsController.create);
router.put("/:id", claimsController.update);

export default router;
