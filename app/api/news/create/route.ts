import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, imageUrl, goal, description, deadline } = await request.json();

        const news = await db.news.create({
            data: {
                name,
                imageUrl,
                goal,
                description,
                deadline,
            },
        });

        if (!news) {
            return new NextResponse('News not created', { status: 401 });
        }

        return NextResponse.json(news);
    } catch (error: any) {
        console.error("[NEWS_CREATE_ERROR]", error);
        return new NextResponse('Failed to create news', { status: 500 });
    }
}
