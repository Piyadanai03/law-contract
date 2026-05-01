import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import apiRoutes from "./routes";
import { config } from "./config/env";

const app = new Hono();

// Global Middleware
app.use("*", logger());
app.use("*", cors());

// Health Check
app.get("/", (c) => c.json({ message: "API is running smoothly!" }));

// Mount all routes
app.route("/api", apiRoutes);

// Global Error Handler
app.onError((err, c) => {
  console.error(`[Error]: ${err.message}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

export default {
  port: config.port,
  fetch: app.fetch,
};