import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { apiLimiter } from "./middleware/rateLimiter";
import { requestContext } from "./middleware/requestContext";
import { requestLogger } from "./middleware/requestLogger";
import testRoute from "./routes/test";
import authRoutes from "./modules/auth/auth.routes";
import clientRoutes from "./modules/clients/routes";
import companyRoutes from "./modules/companies/routes";
import planRoutes from "./modules/plans/routes";
import policyRoutes from "./modules/policies/routes";
import premiumRoutes from "./modules/premium/routes";
import quotationRoutes from "./modules/quotations/routes";
import { paymentRoutes } from "./modules/payments";
import { documentRoutes } from "./modules/documents";
import { dashboardRoutes } from "./modules/dashboard";

import reportsRoutes from "./modules/reports";
import claimRoutes from "./modules/claims";




import commissionRoutes from "./modules/commissions/routes";
import expenseRoutes from "./modules/expenses/routes";
import payoutRoutes from "./modules/payouts/routes";
import invoiceRoutes from "./modules/invoices/routes";
import financeRoutes from "./modules/finance/routes";
import taskRoutes from "./modules/crm/task.routes";
import leadRoutes from "./modules/crm/leads.routes";
import aiRoutes from "./modules/ai/ai.routes";

import renewalsRoutes from "./modules/renewals";
import notificationsRoutes from "./modules/notifications";
import policyWorkflowRoutes from "./modules/policy-workflow";
import healthRoutes from "./modules/health";
import { setupSwagger } from "./docs/swagger";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import { auditMiddleware } from "./middleware/auditMiddleware";

dotenv.config();

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175"
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestContext);

// Security Middlewares
app.use(helmet()); // Sets CSP and other security headers
if (process.env.NODE_ENV !== "test") {
  app.use("/api/", apiLimiter); // Apply rate limiting to all API routes
}

// Setup Swagger
setupSwagger(app);

// Routes
app.use(requestLogger);
app.use(auditMiddleware);

app.use("/api/v1", healthRoutes);

app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/plans", planRoutes);
app.use("/api/v1/policies", policyRoutes);
app.use("/api/v1/premium", premiumRoutes);
app.use("/api/v1/quotations", quotationRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/claims", claimRoutes);
app.use("/api/v1/reports", reportsRoutes);
app.use("/api/v1/renewals", renewalsRoutes);
app.use("/api/v1/notifications", notificationsRoutes);
app.use("/api/v1/workflow", policyWorkflowRoutes);




app.use("/api/v1/commissions", commissionRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/payouts", payoutRoutes);
app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/finance", financeRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/leads", leadRoutes);
app.use("/api/v1/ai", aiRoutes);


app.use(notFoundHandler);
app.use(errorHandler);

export default app;
