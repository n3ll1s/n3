import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('authToken')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: string;
            email: string;
            name: string;
            isAdmin: boolean;
        };
        (req as any).user = decoded;
        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}

export const config = {
    matcher: '/api/:path*',
};
