import { db } from '@/lib/db';
import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const news = await db.news.findMany();

        if (!news) {
            return new NextResponse('Новости не найдены', { status: 404 });
        }

        return NextResponse.json(news)
    } catch (error: any) {
        console.error("[NEWS_CREATE_ERROR]", error)
        return new NextResponse('[error create news]', error.message)
    }
}