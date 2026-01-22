import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const sop = await prisma.sOP.findUnique({
            where: { id },
        });

        if (!sop) {
            return NextResponse.json(
                { error: 'SOP not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(sop);
    } catch (error) {
        console.error('Error fetching SOP:', error);
        return NextResponse.json(
            { error: 'Failed to fetch SOP' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, description, content, category, status, version } = body;

        const sop = await prisma.sOP.update({
            where: { id },
            data: {
                title,
                description,
                content: typeof content === 'string' ? content : JSON.stringify(content),
                category,
                status,
                version,
            },
        });

        return NextResponse.json(sop);
    } catch (error) {
        console.error('Error updating SOP:', error);
        return NextResponse.json(
            { error: 'Failed to update SOP' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.sOP.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting SOP:', error);
        return NextResponse.json(
            { error: 'Failed to delete SOP' },
            { status: 500 }
        );
    }
}
