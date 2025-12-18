// --- 2. Create the Main Middleware Export ---
// This is the function Next.js will automatically run for matching requests.

import { NextRequest, NextResponse } from "next/server";
import { logger } from "./middlewares/logger.middlware";
import { auth } from "./middlewares/auth.middleware";

export function proxy(request: NextRequest) {
    // Define the chain of middlewares you want to run, in order.
    const middlewaresToRun = [logger, auth];

    // Loop through the middlewares
    for (const middlewareFn of middlewaresToRun) {
        // Execute the middleware
        const response = middlewareFn(request);

        // If a middleware returns a redirect, we stop the chain and return that response.
        // We check for the 'location' header which is set by NextResponse.redirect().
        if (response instanceof NextResponse && response.headers.get('location')) {
            return response;
        }
    }

    // If the loop completes without any redirects, we proceed to the requested page.
    return NextResponse.next();
}


// --- 3. (Important) Add a Matcher ---
// The `matcher` config tells Next.js which paths your middleware should run on.
// Without this, it would run on every single request, which is usually not what you want.

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - /login (the login page itself, to avoid a redirect loop)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|login|guestHero.lottie).*)',
    ],
};