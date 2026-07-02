import { beforeAll, afterAll, vi } from "vitest";

vi.mock("ioredis", () => {
  return {
    default: class Redis {
      on = vi.fn();
      ping = vi.fn().mockResolvedValue("PONG");
      call = vi.fn();
    }
  };
});

vi.mock("bullmq", () => ({
  Queue: class Queue {
    add = vi.fn();
  },
  Worker: class Worker {
    on = vi.fn();
  }
}));

beforeAll(() => {
  process.env.NODE_ENV = "test";
});

afterAll(() => {
  vi.clearAllMocks();
});
