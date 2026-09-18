import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const isAuthenticated = verifyAdminSession(request);
  return NextResponse.json({ authenticated: isAuthenticated });
}
