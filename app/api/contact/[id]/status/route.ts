import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { status } = await req.json();

    if (!status) {
        return NextResponse.json({ message: 'Status is required' }, { status: 400 });
    }

    try {
        const updatedContact = await db.contacts.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(updatedContact);
    } catch (error) {
        console.error('[CONTACT_UPDATE_ERROR]', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
