import * as jose from 'jose';
import type { JWTPayload } from 'jose';
import { JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE, JWT_EXPIRY } from '$env/static/private';

const secret: Uint8Array<ArrayBuffer> = new TextEncoder().encode(JWT_SECRET);

export const generateToken: (payload?: JWTPayload) => Promise<string> = async (
  payload?: JWTPayload
): Promise<string> => {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(JWT_EXPIRY)
    .sign(secret);
};

export const getTokenPayload = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jose.jwtVerify(token, secret, {
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE
  });

  return payload;
};
