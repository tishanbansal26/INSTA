import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "vitest";

describe("Health API", () => {
  it("should return 200 OK for basic health check", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.message).toBe("Service is healthy");
  });
});
