import { type NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ['/auth/login', '/auth/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  if (isPublicPath) {
    console.warn('[Middleware] Public path, allowing access');

    return NextResponse.next();
  }

  const isDashboardPath = pathname === '/' || pathname.startsWith('/dashboard');

  if (isDashboardPath) {
    const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
      const loginUrl = new URL('/auth/login', request.url);

      loginUrl.searchParams.set('redirect', pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: [
  '/',
  '/dashboard/:path*',
  '/((?!api|_next|favicon.ico).*)',
] };
