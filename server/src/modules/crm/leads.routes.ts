import { Router } from "express";
import { leadsController } from "./leads.controller";
import { authenticate } from "../../shared/middleware/authenticate";

const router = Router();

// Public route for lead creation (e.g. from the website)
router.post("/", leadsController.create);

// Protected routes
router.use(authenticate);
router.get("/", leadsController.list);
router.put("/:id", leadsController.update);
router.delete("/:id", leadsController.delete);

export default router;
