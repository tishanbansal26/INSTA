import { Router } from "express";
import { leadsController } from "./leads.controller";
import { authenticate } from "../../shared/middleware/authenticate";

const router = Router();

router.use(authenticate);

router.get("/", leadsController.list);
router.post("/", leadsController.create);
router.put("/:id", leadsController.update);
router.delete("/:id", leadsController.delete);

export default router;
