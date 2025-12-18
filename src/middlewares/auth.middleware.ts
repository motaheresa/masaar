import { NextRequest, NextResponse } from "next/server";

export const auth = (req: NextRequest) => {
    console.log("[Auth]: Checking authentication...");
    console.log(req.url);


    const token = req.cookies.get("token");
    console.log(req.nextUrl);
    if (req.nextUrl.pathname.startsWith("/register") || req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname === "/") {
        if (token) {
            return NextResponse.redirect(new URL("/main", req.url));
        }
        return NextResponse.next();
    }


    if (!token) {
        console.log("[Auth]: No token found. Redirecting to login.");
        // This is a terminating response. It will stop the middleware chain.
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    console.log("[Auth]: Token found. Proceeding.");
    // To continue, we return NextResponse.next()
    return NextResponse.next();
};
