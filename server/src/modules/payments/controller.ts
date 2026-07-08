import type { Request, Response, NextFunction } from "express";
import { apiResponse } from "../../shared/responses/apiResponse";
import { paymentService } from "./service";
import Razorpay from "razorpay";
import crypto from "crypto";
import { AppError } from "../../shared/errors/AppError";
import { notificationService } from "../../shared/services/NotificationService";
import { AuditService } from "../../shared/services/AuditService";

export const paymentController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const payment = await paymentService.create(req.body, req.user.id);
      await AuditService.log({
        req,
        tableName: "Payment",
        recordId: payment.id,
        action: "CREATE",
        newValue: payment
      });
      res.status(201).json(apiResponse(true, "Payment created successfully", payment, 201));
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const payment = await paymentService.getById(id);
      res.status(200).json(apiResponse(true, "Payment fetched successfully", payment));
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const oldPayment = await paymentService.getById(id);
      const payment = await paymentService.update(id, req.body, req.user.id);
      await AuditService.log({
        req,
        tableName: "Payment",
        recordId: payment.id,
        action: "UPDATE",
        oldValue: oldPayment,
        newValue: payment
      });
      res.status(200).json(apiResponse(true, "Payment updated successfully", payment));
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const id = Array.isArray((req.params.id as string)) ? (req.params.id as string)[0] : (req.params.id as string);
      const oldPayment = await paymentService.getById(id);
      const payment = await paymentService.remove(id, req.user.id);
      await AuditService.log({
        req,
        tableName: "Payment",
        recordId: id,
        action: "DELETE",
        oldValue: oldPayment
      });
      res.status(200).json(apiResponse(true, "Payment deleted successfully", payment));
    } catch (error) {
      next(error);
    }
  },

  byPolicy: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const policyId = Array.isArray(req.params.policyId) ? req.params.policyId[0] : req.params.policyId;
      req.query.policyId = policyId;
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Policy payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  byClient: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId = Array.isArray(req.params.clientId) ? req.params.clientId[0] : req.params.clientId;
      req.query.clientId = clientId;
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Client payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  pending: async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query.paymentStatus = "PENDING";
      const result = await paymentService.list(req.query);
      res.status(200).json(apiResponse(true, "Pending payments fetched successfully", result));
    } catch (error) {
      next(error);
    }
  },

  createOrder: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const { amount, currency = "INR", receipt } = req.body;
      
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
        key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummysecret456'
      });

      const options = {
        amount: amount * 100, // amount in smallest currency unit (paise)
        currency,
        receipt
      };

      const order = await razorpay.orders.create(options);
      res.status(200).json(apiResponse(true, "Order created successfully", order));
    } catch (error) {
      console.error("Razorpay Order Error:", error);
      next(new AppError("Failed to create payment order", 500));
    }
  },

  verifyPayment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) throw new Error("Unauthorized");
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

      const secret = process.env.RAZORPAY_KEY_SECRET || 'dummysecret456';
      
      const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

      if (generated_signature === razorpay_signature) {
        // Payment is successful
        const oldPayment = await paymentService.getById(paymentId);
        const updatedPayment = await paymentService.update(paymentId, {
          paymentStatus: "SUCCESS",
          transactionId: razorpay_payment_id
        }, req.user.id);

        await AuditService.log({
          req,
          tableName: "Payment",
          recordId: updatedPayment.id,
          action: "UPDATE",
          oldValue: oldPayment,
          newValue: updatedPayment
        });
        
        // Trigger notification event
        notificationService.notify('payment.received', {
          amount: updatedPayment.amount,
          email: req.user.email,
          phone: "+919999999999", // should come from user profile in reality
          name: req.user.name,
          receiptUrl: `https://api.insureflow.com/receipts/${updatedPayment.id}`
        });

        res.status(200).json(apiResponse(true, "Payment verified successfully", updatedPayment));
      } else {
        res.status(400).json(apiResponse(false, "Invalid payment signature", null, 400));
      }
    } catch (error) {
      console.error("Razorpay Verify Error:", error);
      next(new AppError("Failed to verify payment", 500));
    }
  }
};
