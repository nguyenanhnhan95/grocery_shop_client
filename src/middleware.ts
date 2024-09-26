import { NextRequest, NextResponse } from "next/server";
import { createActionURL } from "./utils/commonUtils";
import { COOKIE_AUTH_TOKEN, NOT_AUTHENTICATION, ROLES } from "./utils/commonConstants";

const authenticationRoutes = ['/login', '/signup'];
const publicRoles = ['/', '/about'];
const adminPrefix = '/admin';
export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Allow public routes without authentication
  if (publicRoles.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_AUTH_TOKEN);

  // Handle requests without a token
  if (!token) {
    // Redirect to home if trying to access admin pages without a token
    if (pathname.startsWith(adminPrefix)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next(); // Continue to other routes
  }

  try {
    // Make API call to verify user role only if accessing admin pages or restricted routes
    if (pathname.startsWith(adminPrefix) || !publicRoles.includes(pathname)) {
      const roleResponse = await fetch(createActionURL('auth/role').instant(), {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: `${COOKIE_AUTH_TOKEN}=${token.value}`,
        },
      });

      if (!roleResponse.ok) throw new Error('Failed to fetch user role');

      const { result } = await roleResponse.json();

      // If user lacks ROLE_USER and tries to access admin routes, redirect to home
      if (pathname.startsWith(adminPrefix) && Array.isArray(result)) {
        if (result.includes(ROLES.ROLE_USER)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
        return NextResponse.next();
      }

      // Redirect authenticated users away from login/signup pages
      if (authenticationRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  } catch (error) {
    console.error('Error verifying user role:', error);
    // Redirect to home for failed role checks
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Exclude API routes and static assets from middleware
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
