import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateXLSX } from '@/lib/export/xlsx-generator';

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

        const buffer = await generateXLSX(sop);

        // Create safe filename
        const safeTitle = sop.title
            .replace(/[^a-z0-9]/gi, '_')
            .toLowerCase()
            .substring(0, 50);
        const filename = `${safeTitle}_checklist_v${sop.version}.xlsx`;

        return new NextResponse(new Uint8Array(buffer), {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error('Error exporting XLSX:', error);
        return NextResponse.json(
            { error: 'Failed to export SOP as Excel checklist' },
            { status: 500 }
        );
    }
}
