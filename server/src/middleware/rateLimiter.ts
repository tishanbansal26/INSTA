import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";
import { env } from "../config/env";

// Create a redis client specifically for rate limiting
const redisClient = new Redis(env.REDIS_URL, {
  enableOfflineQueue: false, // Fast fail if Redis is down
});

redisClient.on("error", (err) => {
  console.warn("Redis connection error for rate limiter:", err.message);
});

const store = env.NODE_ENV === "production"
  ? new RedisStore({
      sendCommand: (...args: string[]) => redisClient.call(args[0], ...args.slice(1)) as any,
    })
  : undefined;

export const apiLimiter = rateLimit({
  store,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests from this IP, please try again after 15 minutes" }
});

export const authLimiter = rateLimit({
  store,
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts from this IP, please try again after an hour" }
});
