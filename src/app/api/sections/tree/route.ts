// app/api/sections/tree/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      where: {
        parent: { // Usamos la relación en lugar del campo directo
          is: null, // Filtra secciones sin padre
        },
      },
      include: {
        children: {
          include: {
            children: true,
          },
          orderBy: {
            order: 'asc', // Ordena hijos por el campo 'order'
          },
        },
      },
      orderBy: {
        order: 'asc', // Ordena secciones principales por el campo 'order'
      },
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching section tree:', error);
    return NextResponse.json(
      { error: 'Failed to fetch section tree' },
      { status: 500 }
    );
  }
}