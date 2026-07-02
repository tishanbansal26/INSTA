import { Router } from "express";
import { policyWorkflowController } from "./controller";

const router = Router();

// In a real app, you would add authMiddleware here.
router.post("/create-policy", policyWorkflowController.createWorkflow.bind(policyWorkflowController));
router.get("/:id", policyWorkflowController.getWorkflow.bind(policyWorkflowController));

// Timeline
router.get("/timeline/:policyId", policyWorkflowController.getTimeline.bind(policyWorkflowController));

// State Transitions
router.post("/:id/approve", policyWorkflowController.approveQuotation.bind(policyWorkflowController));
router.post("/:id/payment", policyWorkflowController.recordPayment.bind(policyWorkflowController));
router.post("/:id/upload", policyWorkflowController.uploadDocument.bind(policyWorkflowController));
router.post("/:id/issue", policyWorkflowController.issuePolicy.bind(policyWorkflowController));
router.post("/:id/complete", policyWorkflowController.completeWorkflow.bind(policyWorkflowController));

export default router;
