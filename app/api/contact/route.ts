import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new NextResponse('Пользователь не авторизован', { status: 401 });
        }

        const { email, phone, firstName, lastName } = await request.json();

        const userName = session.user.name ?? '';
        const contact = await db.contacts.create({
            data: {
                email,
                phone,
                firstName,
                lastName,
                userId: userName  // Ensure userId is passed correctly
            },
        });

        if (!contact) {
            return new NextResponse('Контакт не создан', { status: 401 });
        }

        return NextResponse.json(contact);
    } catch (error: any) {
        console.error("[CONTACT_CREATE_ERROR]", error);
        return new NextResponse('Не удалось создать контакт', { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return new NextResponse('Пользователь не авторизован', { status: 401 });
        }


        const contacts = await db.contacts.findMany();

        if (contacts.length === 0) {
            return new NextResponse('Контакты не найдены', { status: 404 });
        }

        return NextResponse.json(contacts);
    } catch (error: any) {
        console.error("[CONTACT_GET_ERROR]", error);
        return new NextResponse('Не удалось найти контакты', { status: 500 });
    }
}
