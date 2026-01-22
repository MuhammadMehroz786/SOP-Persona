import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const isPrebuilt = searchParams.get('isPrebuilt');

        const where: any = {};

        if (category) {
            where.category = category;
        }

        if (isPrebuilt !== null) {
            where.isPrebuilt = isPrebuilt === 'true';
        }

        const personas = await prisma.persona.findMany({
            where,
            orderBy: { updatedAt: 'desc' },
            include: {
                _count: {
                    select: {
                        responses: true,
                        scenarios: true
                    }
                }
            }
        });

        return NextResponse.json(personas);
    } catch (error) {
        console.error('Error fetching personas:', error);
        return NextResponse.json(
            { error: 'Failed to fetch personas' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            name,
            description,
            age,
            occupation,
            background,
            avatarUrl,
            voiceProfile,
            beliefs,
            toneProfile,
            behaviors,
            category,
            isPrebuilt,
            tags
        } = body;

        const persona = await prisma.persona.create({
            data: {
                name,
                description,
                age: age || null,
                occupation: occupation || null,
                background: background || null,
                avatarUrl: avatarUrl || null,
                voiceProfile: voiceProfile || null,
                beliefs: beliefs || null,
                toneProfile: toneProfile || null,
                behaviors: behaviors || null,
                category: category || null,
                isPrebuilt: isPrebuilt || false,
                tags: tags || null,
            },
        });

        return NextResponse.json(persona);
    } catch (error) {
        console.error('Error creating persona:', error);
        return NextResponse.json(
            { error: 'Failed to create persona' },
            { status: 500 }
        );
    }
}
