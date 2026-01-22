import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateHTML } from '@/lib/export/html-generator';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const sop = await prisma.sOP.findUnique({
            where: { id }
        });

        if (!sop) {
            return NextResponse.json(
                { error: 'SOP not found' },
                { status: 404 }
            );
        }

        const html = generateHTML(sop);

        // Create safe filename
        const safeTitle = sop.title
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase()
            .substring(0, 50);
        const filename = `${safeTitle}_v${sop.version}.html`;

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Error exporting HTML:', error);
        return NextResponse.json(
            { error: 'Failed to export SOP as HTML' },
            { status: 500 }
        );
    }
}
