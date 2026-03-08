export const config = {
  dbUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
  port: process.env.PORT || 8000,
};