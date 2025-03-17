import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// app/api/sections/route.ts
export async function POST(req: Request) {
  const formData = await req.formData();
  
  try {
    const parentId = formData.get('parentId') 
      ? Number(formData.get('parentId'))
      : null;

    const sectionType = formData.get('sectionType') as 'mixed' | 'table';

    const sectionData = {
      title: formData.get('title') as string,
      slug: formData.get('slug') as string,
      order: Number(formData.get('order')),
      ...(parentId && { parent: { connect: { id: parentId } } }),
      ...(sectionType && {
        contentType: {
          create: {
            type: sectionType,
            ...(sectionType === 'mixed' && {
              content: formData.get('content') as string,
              files: formData.getAll('files') as string[]
            }),
            ...(sectionType === 'table' && {
              tableData: JSON.parse(formData.get('tableData') as string)
            })
          }
        }
      })
    };

    const section = await prisma.section.create({
      data: sectionData,
      include: { contentType: true }
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error('Error creating section:', error);
    return NextResponse.json(
      { error: 'Failed to create section', details: error },
      { status: 500 }
    );
  }
}