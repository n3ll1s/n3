import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const newsId = params.id;

        const news = await db.news.findUnique({
            where: { id: newsId },
        });

        if (!news) {
            return new NextResponse('Проект не найдена', { status: 404 });
        }

        return NextResponse.json(news);
    } catch (error: any) {
        console.error("[NEWS_GET_ERROR]", error);
        return new NextResponse('Ошибка при получении проекта', { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const newsId = params.id;

        const deletedNews = await db.news.delete({
            where: { id: newsId },
        });

        if (!deletedNews) {
            return new NextResponse('Проект не найдена', { status: 404 });
        }

        return new NextResponse('Проект успешно удалена', { status: 200 });
    } catch (error: any) {
        console.error("[NEWS_DELETE_ERROR]", error);
        return new NextResponse('Ошибка при удалении проекта', { status: 500 });
    }
}
