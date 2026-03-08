import { db } from "../../db";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";

export const authService = {
  async socialLogin(platform: 'google' | 'facebook', data: any) {
    const socialId = platform === 'google' ? data.googleId : data.facebookId;
    const idColumn = platform === 'google' ? users.google_id : users.facebook_id;

    let user = (await db.select().from(users).where(eq(idColumn, socialId)).limit(1))[0];

    if (!user) {
      const [insertResult] = await db.insert(users).values({
        name: data.name,
        email: data.email || "",
        picture: data.picture || "",
        [platform === 'google' ? 'google_id' : 'facebook_id']: socialId,
      });
      user = (await db.select().from(users).where(eq(users.id, insertResult.insertId)).limit(1))[0];
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    return { token, user };
  }
};