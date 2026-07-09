import prisma from "../../config/prisma";
import type { Request } from "express";

export const AuditService = {
  log: async (params: {
    userId?: string;
    tableName: string;
    recordId: string;
    action: "CREATE" | "UPDATE" | "DELETE";
    oldValue?: any;
    newValue?: any;
    req?: Request;
  }) => {
    try {
      const ipAddress = params.req?.ip || params.req?.socket?.remoteAddress || null;
      const userAgent = params.req?.headers?.["user-agent"] || null;
      let browser = null;
      let device = null;

      if (userAgent) {
        if (userAgent.includes("Chrome")) browser = "Chrome";
        else if (userAgent.includes("Firefox")) browser = "Firefox";
        else if (userAgent.includes("Safari")) browser = "Safari";
        else if (userAgent.includes("Edge")) browser = "Edge";
        else browser = "Other";

        if (userAgent.includes("Mobi")) device = "Mobile";
        else device = "Desktop";
      }

      await prisma.auditTrail.create({
        data: {
          userId: params.userId || (params.req as any)?.user?.id || null,
          tableName: params.tableName,
          recordId: params.recordId,
          action: params.action,
          oldValue: params.oldValue ? JSON.parse(JSON.stringify(params.oldValue)) : null,
          newValue: params.newValue ? JSON.parse(JSON.stringify(params.newValue)) : null,
          ipAddress,
          browser,
          device,
        },
      });
    } catch (error) {
      console.error("Failed to log audit trail:", error);
    }
  },
};
