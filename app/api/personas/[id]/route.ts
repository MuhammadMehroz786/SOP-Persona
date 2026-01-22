import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const persona = await prisma.persona.findUnique({
      where: { id },
      include: {
        responses: {
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        scenarios: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!persona) {
      return NextResponse.json(
        { error: 'Persona not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(persona);
  } catch (error) {
    console.error('Error fetching persona:', error);
    return NextResponse.json(
      { error: 'Failed to fetch persona' },
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
      tags
    } = body;

    const persona = await prisma.persona.update({
      where: { id },
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
        tags: tags || null,
      },
    });

    return NextResponse.json(persona);
  } catch (error) {
    console.error('Error updating persona:', error);
    return NextResponse.json(
      { error: 'Failed to update persona' },
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
    await prisma.persona.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting persona:', error);
    return NextResponse.json(
      { error: 'Failed to delete persona' },
      { status: 500 }
    );
  }
}
