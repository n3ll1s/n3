import 'next/server';

declare module 'next/server' {
    interface NextRequest {
        user?: {
            id: string;
            email: string;
            name: string;
            isAdmin: boolean;
        };
    }
}
