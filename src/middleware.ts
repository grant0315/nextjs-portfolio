import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  
  // Extract subdomain from hostname
  // Handle both production (subdomain.domain.com) and localhost (subdomain.localhost:3000)
  let subdomain: string | null = null;
  
  if (hostname.includes('localhost')) {
    // For localhost, check if it's subdomain.localhost:port
    // Remove port if present (e.g., demos.localhost:3000 -> demos.localhost)
    const hostnameWithoutPort = hostname.split(':')[0];
    const parts = hostnameWithoutPort.split('.');
    if (parts.length > 1 && parts[0] !== 'localhost') {
      subdomain = parts[0];
    }
  } else {
    // For production, extract subdomain (skip www)
    const parts = hostname.split('.');
    if (parts.length >= 3 && parts[0] !== 'www') {
      subdomain = parts[0];
    } else if (parts.length === 2 && parts[0] !== 'www') {
      // Handle cases like demos.granthopkins.com
      subdomain = parts[0];
    }
  }

  // Handle demos subdomain
  if (subdomain === 'demos') {
    // Rewrite to /demos path
    if (!url.pathname.startsWith('/demos')) {
      url.pathname = `/demos${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  
  // Handle blog subdomain
  if (subdomain === 'blog') {
    // Rewrite to /blog path
    if (!url.pathname.startsWith('/blog')) {
      url.pathname = `/blog${url.pathname === '/' ? '' : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // For main domain (www, no subdomain, or localhost without subdomain), serve the main app
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

