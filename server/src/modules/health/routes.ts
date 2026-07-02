import { Router } from "express";
import { healthController } from "./controller";

const router = Router();

router.get("/health", healthController.getHealth.bind(healthController));
router.get("/ready", healthController.getReady.bind(healthController));
router.get("/metrics", healthController.getMetrics.bind(healthController));

export default router;
