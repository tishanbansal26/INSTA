import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import "./utils/queue"; // Initialize BullMQ workers
import { initScheduler } from "./scheduler";

initScheduler();




app.listen(env.PORT, () => {
  logger.info(`🚀 Server running on port ${env.PORT}`);
});
