import { Context } from "hono";
import { authService } from "./auth.service";
import { socialLoginSchema } from "./auth.schema";

export const googleLogin = async (c: Context) => {
  const body = await c.req.json();
  const parsed = socialLoginSchema.safeParse(body);
  
  if (!parsed.success) return c.json({ error: "Invalid Data" }, 400);

  const result = await authService.socialLogin('google', parsed.data.userData);
  return c.json(result);
};

export const facebookLogin = async (c: Context) => {
  const body = await c.req.json();
  const parsed = socialLoginSchema.safeParse(body);
  
  if (!parsed.success) return c.json({ error: "Invalid Data" }, 400);

  const result = await authService.socialLogin('facebook', parsed.data.userData);
  return c.json(result);
};