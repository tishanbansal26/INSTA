import { Queue, Worker, Job } from "bullmq";
import { env } from "../config/env";
import { logger } from "./logger";
import { redisClient } from "../config/redis";

// Create Queues
export const emailQueue = new Queue("email-notifications", { connection: redisClient as any });
export const renewalQueue = new Queue("policy-renewals", { connection: redisClient as any });

// Generic Worker Error Handler
const handleWorkerError = (workerName: string, err: Error) => {
  logger.error(`Worker [${workerName}] Error:`, err);
};

// Initialize Email Worker
export const emailWorker = new Worker(
  "email-notifications",
  async (job: Job) => {
    logger.info(`Processing Email Job ${job.id}`, job.data);
    // TODO: Integrate actual email provider (SendGrid/AWS SES)
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
    logger.info(`Email Job ${job.id} completed`);
  },
  { connection: redisClient as any }
);
emailWorker.on("error", (err) => handleWorkerError("emailWorker", err));

// Initialize Renewal Worker
export const renewalWorker = new Worker(
  "policy-renewals",
  async (job: Job) => {
    logger.info(`Processing Renewal Job ${job.id}`, job.data);
    // TODO: Trigger renewal logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    logger.info(`Renewal Job ${job.id} completed`);
  },
  { connection: redisClient as any }
);
renewalWorker.on("error", (err) => handleWorkerError("renewalWorker", err));

logger.info("BullMQ Queues & Workers initialized.");
