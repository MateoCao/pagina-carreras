// app/api/sections/validate-slug/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const parentId = searchParams.get('parentId');

  if (!slug) {
    return NextResponse.json({ error: 'Slug es requerido' }, { status: 400 });
  }

  const existingSection = await prisma.section.findFirst({
    where: {
      slug,
      parentId: parentId ? Number(parentId) : null,
    },
  });

  return NextResponse.json({ isUnique: !existingSection });
}