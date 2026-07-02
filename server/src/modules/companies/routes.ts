import { Router } from "express";
import { companyController } from "./controller";
import { authenticate } from "../../shared/middleware/authenticate";
import { authorize } from "../../shared/middleware/authorize";
import { validate } from "../../shared/middleware/validate";
import { createCompanySchema, updateCompanySchema } from "./validation";

const router = Router();

router.post("/", authenticate, authorize("Company.Create"), validate(createCompanySchema), companyController.create);
router.get("/", authenticate, companyController.list);
router.get("/:id", authenticate, companyController.getById);
router.patch("/:id", authenticate, authorize("Company.Update"), validate(updateCompanySchema), companyController.update);
router.delete("/:id", authenticate, authorize("Company.Delete"), companyController.remove);

export default router;
