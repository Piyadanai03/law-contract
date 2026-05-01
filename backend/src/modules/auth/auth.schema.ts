import { z } from "zod";

export const socialLoginSchema = z.object({
  userData: z.object({
    name: z.string(),
    email: z.string().email().optional(),
    picture: z.string().optional(),
    googleId: z.string().optional(),
    facebookId: z.string().optional(),
  })
});