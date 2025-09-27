import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/plans",
    "/booking",
    "/api/webhooks/stripe",
    "/api/subscription-plans",
  ],
  
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [
    "/api/webhooks/stripe",
    "/api/subscription-plans",
  ],
  
  afterAuth: (auth, req) => {
    const { userId, sessionId } = auth;
    const { pathname } = req.nextUrl;
    
    // Log authentication state
    logger.debug("Middleware: Auth state", {
      path: pathname,
      userId: userId || undefined,
      sessionId: sessionId || undefined,
      isAuthenticated: !!userId,
    });
    
    // Handle protected routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/barber")) {
      if (!userId) {
        logger.warn("Middleware: Unauthorized access attempt", {
          path: pathname,
        });
        
        // Redirect to sign-in with return URL
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("redirect_url", pathname);
        return NextResponse.redirect(signInUrl);
      }
    }
    
    // Handle role-based access (will be implemented with user roles)
    if (pathname.startsWith("/admin")) {
      // TODO: Check if user has admin role
      // For now, allow any authenticated user
    }
    
    if (pathname.startsWith("/barber")) {
      // TODO: Check if user has barber role
      // For now, allow any authenticated user
    }
    
    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
