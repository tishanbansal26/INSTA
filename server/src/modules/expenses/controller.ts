import { Request, Response } from "express";
import { expenseService } from "./service";
import { AppError } from "../../shared/errors/AppError";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.create(req.body);
    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    if (error instanceof AppError) res.status(error.statusCode).json({ success: false, message: error.message });
    else res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const listExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await expenseService.list(req.query);
    res.json({ success: true, data: expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.getById((req.params.id as string));
    res.json({ success: true, data: expense });
  } catch (error) {
    if (error instanceof AppError) res.status(error.statusCode).json({ success: false, message: error.message });
    else res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.update((req.params.id as string), req.body);
    res.json({ success: true, data: expense });
  } catch (error) {
    if (error instanceof AppError) res.status(error.statusCode).json({ success: false, message: error.message });
    else res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    await expenseService.remove((req.params.id as string));
    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    if (error instanceof AppError) res.status(error.statusCode).json({ success: false, message: error.message });
    else res.status(500).json({ success: false, message: "Internal server error" });
  }
};
