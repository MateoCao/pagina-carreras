// app/api/sections/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const formData = await req.formData();

  const sectionData = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    order: Number(formData.get('order')) || 0,
    ...(formData.get('parentId') && {
      parent: {
        connect: { id: Number(formData.get('parentId')) },
      },
    }),
  };

  const content = formData.get('content') as string | null;
  const files = formData.getAll('files') as File[];

  try {
    const section = await prisma.section.create({
      data: {
        ...sectionData,
        ...(content && {
          contentType: {
            create: {
              content,
              files: await Promise.all(files.map(async (file) => {
                // Aquí implementar la lógica de subida de archivos
                return `/uploads/${file.name}`;
              })),
            },
          },
        }),
      },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sections = await prisma.section.findMany();
    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
      { status: 500 }
    );
  }
}