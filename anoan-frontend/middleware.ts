import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")

  // Protected routes that require authentication
  const protectedRoutes = ["/account"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Auth routes that should redirect to account if already logged in
  const authRoutes = ["/login", "/register"]
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    // Redirect to login if accessing protected route without token
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthRoute && token) {
    // Redirect to account if accessing auth route with token
    return NextResponse.redirect(new URL("/account", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/account/:path*", "/login", "/register"],
} 