import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new NextResponse('Пользователь не авторизован', { status: 401 });
        }


        const users = await db.user.findMany();

        if (users.length === 0) {
            return new NextResponse('Контакты не найдены', { status: 404 });
        }

        return NextResponse.json(users);
    } catch (error: any) {
        console.error("[CONTACT_GET_ERROR]", error);
        return new NextResponse('Не удалось найти контакты', { status: 500 });
    }
}
