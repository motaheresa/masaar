import { NextResponse, NextRequest } from 'next/server';


export const logger = (req: NextRequest) => {
    console.log(`[Logger]: Request for ${req.nextUrl.pathname}`);
    return NextResponse.next();
};