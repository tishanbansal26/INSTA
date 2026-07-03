import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { apiResponse } from "../../shared/responses/apiResponse";
import { redisClient } from "../../config/redis";
import os from "os";

export class HealthController {
  
  async getHealth(_req: Request, res: Response) {
    res.status(200).json({ status: "OK", message: "Service is healthy" });
  }

  async getReady(_req: Request, res: Response) {
    try {
      // Check Postgres
      await prisma.$queryRaw`SELECT 1`;
      
      // Check Redis
      await redisClient.ping();

      res.status(200).json({ status: "READY", message: "Dependencies are reachable" });
    } catch (error: any) {
      res.status(503).json({ status: "UNAVAILABLE", message: error.message });
    }
  }

  async getMetrics(_req: Request, res: Response) {
    const memory = process.memoryUsage();
    res.status(200).json({
      status: "OK",
      uptime: process.uptime(),
      timestamp: Date.now(),
      system: {
        freemem: os.freemem(),
        totalmem: os.totalmem(),
        cpus: os.cpus().length,
      },
      memory: {
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
      }
    });
  }
}

export const healthController = new HealthController();
