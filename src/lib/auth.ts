import { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'admin_session';

export function getExpectedSessionToken(): string {
  return process.env.ADMIN_SECRET || 'timeless_fragrance_secret_key_sufi1234';
}

export function verifyAdminSession(request: NextRequest): boolean {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return false;
  return (
    session === getExpectedSessionToken() ||
    session === 'authenticated_sufi1234'
  );
}
