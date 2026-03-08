import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { Context, Next } from "hono";

export interface JwtPayload {
  userId: number;
  email: string;
}

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const authHeader = c.req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    
    const token = authHeader.split(" ")[1];
    
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    
    c.set("user", decoded);
    
    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return c.json({ error: "Token expired" }, 401);
    }
    return c.json({ error: "Invalid token" }, 401);
  }
};