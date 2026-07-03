import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";

export function auditMiddleware(req: Request, res: Response, next: NextFunction) {
  // Skip audit logging for authentication endpoints to avoid foreign key constraints with unauthenticated users
  if (req.originalUrl.includes('/auth/')) {
    return next();
  }

  // We capture the original send to inspect response before it leaves
  const originalSend = res.send;

  res.send = function (body) {
    // Fire and forget audit log on successful mutation requests
    if (req.method !== "GET" && res.statusCode >= 200 && res.statusCode < 300) {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];
      const userId = (req as any).user?.id || "system";
      
      // Determine action
      let action = "CREATE";
      if (req.method === "PUT" || req.method === "PATCH") action = "UPDATE";
      if (req.method === "DELETE") action = "DELETE";

      // Best effort path inference
      const module = req.originalUrl.split('/')[3] || 'unknown';

      // Log asynchronously
      prisma.auditTrail.create({
        data: {
          userId,
          tableName: module,
          recordId: (req.params.id as string) || "new-record",
          action,
          ipAddress: ip ? String(ip) : "unknown",
          browser: userAgent ? String(userAgent) : "unknown",
          device: "unknown",
          newValue: req.body, // In a real app we diff this
        }
      }).catch((err: any) => console.error("Audit log failed:", err));
    }
    
    return originalSend.apply(res, arguments as any);
  };
  
  next();
}
