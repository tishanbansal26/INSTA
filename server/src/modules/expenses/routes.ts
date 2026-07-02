import { Router } from "express";
import { createExpense, listExpenses, getExpense, updateExpense, deleteExpense } from "./controller";

const router = Router();

router.post("/", createExpense);
router.get("/", listExpenses);
router.get("/:id", getExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
