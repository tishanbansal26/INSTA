import { Router } from "express";
import { getDashboardMetrics } from "./controller";

const router = Router();

router.get("/dashboard", getDashboardMetrics);

export default router;
