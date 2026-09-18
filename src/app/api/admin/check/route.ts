import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  const isAuthenticated = session === 'authenticated_sufi1234';
  return NextResponse.json({ authenticated: isAuthenticated });
}
