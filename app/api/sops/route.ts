import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const category = searchParams.get('category');

        const where: any = {};

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        if (category) {
            where.category = category;
        }

        const sops = await prisma.sOP.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
        });

        return NextResponse.json(sops);
    } catch (error) {
        console.error('Error fetching SOPs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch SOPs' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            title,
            description,
            content,
            category,
            status,
            industry,
            tone,
            language,
            regulatoryFramework
        } = body;

        const sop = await prisma.sOP.create({
            data: {
                title,
                description,
                content: typeof content === 'string' ? content : JSON.stringify(content),
                category,
                status: status || 'draft',
                industry: industry || 'general',
                tone: tone || 'formal',
                language: language || 'en',
                regulatoryFramework: regulatoryFramework || null,
            },
        });

        return NextResponse.json(sop);
    } catch (error) {
        console.error('Error creating SOP:', error);
        return NextResponse.json(
            { error: 'Failed to create SOP' },
            { status: 500 }
        );
    }
}
