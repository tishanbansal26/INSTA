import morgan from "morgan";
import { logger } from "../utils/logger";
import { Request } from "express";

// Define a custom morgan token for the request ID
morgan.token("id", function getId(req: Request) {
  return (req as any).id || "unknown";
});

const morganFormat = ":id :method :url :status :res[content-length] - :response-time ms";

export const requestLogger = morgan(morganFormat, {
  stream: {
    write: (message: string) => {
      // Extract the ID to attach it to winston metadata, or let customFormat handle it
      logger.info(message.trim());
    },
  },
});
