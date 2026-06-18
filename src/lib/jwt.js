// lib/auth.ts
import { createRemoteJWKSet, jwtVerify } from "jose";

// 1. Apuntamos al endpoint de claves públicas de Clerk
const JWKS_URL = new URL(process.env.CLERK_DOMAIN);
const JWKS = createRemoteJWKSet(JWKS_URL);

export async function verifyClerkJWT(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: "https://right-boxer-46.clerk.accounts.dev",
    });
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
