// app/api/user/me/route.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                isAdmin: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('[USER_FETCH_ERROR]', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
