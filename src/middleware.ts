import { type NextRequest, NextResponse } from 'next/server';
import { logger } from '../logger';

// Public pages that don't require authentication
const PUBLIC_PAGES = [
  '/', // Home page (Login)
  '/agents',
  '/toolkit',
  '/refresh', // Token refresh page
];

// SPECIAL AUTHENTICATED PAGES that require authentication but are not part of PUBLIC_PAGES
// Normally ALL PAGES EXCEPT IN PUBLIC_PAGES WOULD BE AUTHENTICATED 
// But if `/agents` is public but `/agents/new` is private, you need to add `/agents/new` to this list
const SPECIAL_AUTHENTICATED_PAGES = [
  '/agents/new',
];

// Public static asset extensions that don't require authentication
const PUBLIC_ASSETS = [
  '.svg', // SVG images
  '.png', // PNG images
  '.jpg', // JPG images
  '.jpeg', // JPEG images
  '.ico', // Icon files
  '.webp', // WebP images
  '.gif', // GIF images
];

export const config = {
  matcher: [
    /*
     * Match all request paths except those starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (website icon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

export async function middleware(req: NextRequest) {
  const cookieAuthToken = req.cookies.get('privy-token');
  const cookieSession = req.cookies.get('privy-session');
  const { pathname } = req.nextUrl;

  // Skip middleware for public pages and special authenticated pages
  if (PUBLIC_PAGES.includes(pathname) && !SPECIAL_AUTHENTICATED_PAGES.includes(pathname)) {
    logger('User is accessing a public page', pathname, { module: 'middleware', level: 'debug' });
    return NextResponse.next();
  }

  // Skip middleware for static assets
  if (PUBLIC_ASSETS.some((ext) => pathname.toLowerCase().endsWith(ext))) {
    return NextResponse.next();
  }

  // Skip middleware for Privy OAuth authentication flow
  if (
    req.nextUrl.searchParams.has('privy_oauth_code') ||
    req.nextUrl.searchParams.has('privy_oauth_state') ||
    req.nextUrl.searchParams.has('privy_oauth_provider')
  ) {
    return NextResponse.next();
  }

  // User authentication status check
  const definitelyAuthenticated = Boolean(cookieAuthToken); // User is definitely authenticated (has access token)
  const maybeAuthenticated = Boolean(cookieSession); // User might be authenticated (has session)

  // Handle token refresh cases
  if (!definitelyAuthenticated && maybeAuthenticated) {
    logger('User has session but no access token', undefined, { module: 'middleware', level: 'debug' });
    const redirectUrl = new URL('/refresh', req.url);
    // Ensure redirect_uri is the current page path
    redirectUrl.searchParams.set('redirect_uri', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle unauthenticated cases
  if (!definitelyAuthenticated && !maybeAuthenticated) {
    logger('User is not authenticated', undefined, { module: 'middleware', level: 'debug' });
    const loginUrl = new URL('/', req.url);
    // Ensure redirect_uri is the current page path
    loginUrl.searchParams.set('redirect_uri', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
