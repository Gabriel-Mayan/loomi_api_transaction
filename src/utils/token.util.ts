import { verify } from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET);

export const validateToken = (token: string) => verify(token, JWT_SECRET);
