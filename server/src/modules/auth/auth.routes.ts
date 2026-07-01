import { Router } from "express";
import { authController } from "./auth.controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { rateLimiter } from "../../shared/middleware/rateLimiter";
import { validate } from "../../shared/middleware/validate";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post(
  "/login",
  rateLimiter({ windowMs: 15 * 60 * 1000, maxAttempts: 5 }),
  validate(loginSchema),
  authController.login
);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);
router.get("/admin", authenticate, authorize(["ADMIN"]), (_req, res) => {
  res.json({ success: true, message: "Admin access granted" });
});

export default router;
