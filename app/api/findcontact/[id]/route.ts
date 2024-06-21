import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const newsId = params.id;

        const deleterContact = await db.contacts.delete({
            where: { id: newsId },
        });

        if (!deleterContact) {
            return new NextResponse('Объявление не удалось удалить', { status: 404 });
        }

        return new NextResponse('Объявление успешно удалено', { status: 200 });
    } catch (error: any) {
        console.error("[NEWS_DELETE_ERROR]", error);
        return new NextResponse('Ошибка при удалении проекта', { status: 500 });
    }
}
