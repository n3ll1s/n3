import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = params.id;
        const { isAdmin } = await request.json();

        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { isAdmin },
        });

        return NextResponse.json(updatedUser);
    } catch (error: any) {
        console.error("[USER_UPDATE_ERROR]", error);
        return new NextResponse('Ошибка при обновлении пользователя', { status: 500 });
    }
}
