import Redis from "ioredis";
import { env } from "./env";

export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableOfflineQueue: false,
  retryStrategy: (times) => {
    if (env.NODE_ENV !== "production" && times > 2) {
      console.warn("⚠️ Redis is not running. Falling back to in-memory/disabled mode for development.");
      return null; // Stop retrying in dev
    }
    return Math.min(times * 50, 2000);
  },
});

redisClient.on("error", (err) => {
  if (env.NODE_ENV !== "production") {
    // Suppress infinite error logging in development if disconnected
  } else {
    console.error("Redis connection error:", err.message);
  }
});
