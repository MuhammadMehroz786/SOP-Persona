import { NextResponse } from 'next/server';
import { generateSOP } from '@/lib/openai';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            title,
            description,
            industry = 'general',
            tone = 'formal',
            language = 'en',
            regulatoryFramework = []
        } = body;

        if (!title || !description) {
            return NextResponse.json(
                { error: 'Title and description are required' },
                { status: 400 }
            );
        }

        const generatedContent = await generateSOP(title, description, {
            industry,
            tone,
            language,
            regulatoryFramework
        });

        return NextResponse.json({ content: generatedContent });
    } catch (error) {
        console.error('Error generating SOP:', error);
        return NextResponse.json(
            { error: 'Failed to generate SOP' },
            { status: 500 }
        );
    }
}
