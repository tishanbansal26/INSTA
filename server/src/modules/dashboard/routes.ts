import { Router } from "express";
import { dashboardController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";

const router = Router();

router.get("/overview", authenticate, dashboardController.overview);
router.get("/revenue", authenticate, dashboardController.revenue);
router.get("/policies", authenticate, dashboardController.policies);
router.get("/recent-activities", authenticate, dashboardController.recentActivities);

export default router;
