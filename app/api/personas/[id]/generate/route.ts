import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generatePersonaResponse } from '@/lib/persona-engine';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      prompt,
      contentType = 'dialogue',
      scenario,
      targetAudience,
      conversationHistory,
      saveResponse = true
    } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Fetch persona
    const persona = await prisma.persona.findUnique({
      where: { id }
    });

    if (!persona) {
      return NextResponse.json(
        { error: 'Persona not found' },
        { status: 404 }
      );
    }

    // Generate response using persona engine
    const response = await generatePersonaResponse({
      persona: {
        name: persona.name,
        occupation: persona.occupation || undefined,
        age: persona.age || undefined,
        background: persona.background || undefined,
        voiceProfile: persona.voiceProfile || undefined,
        beliefs: persona.beliefs || undefined,
        toneProfile: persona.toneProfile || undefined,
        behaviors: persona.behaviors || undefined,
      },
      prompt,
      contentType,
      scenario,
      targetAudience,
      conversationHistory
    });

    // Save response to database if requested
    if (saveResponse) {
      await prisma.personaResponse.create({
        data: {
          personaId: id,
          prompt,
          response,
          contentType,
          scenario: scenario || null,
          targetAudience: targetAudience || null,
        }
      });

      // Update persona usage tracking
      await prisma.persona.update({
        where: { id },
        data: {
          usageCount: { increment: 1 },
          lastUsed: new Date()
        }
      });
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error generating persona response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
