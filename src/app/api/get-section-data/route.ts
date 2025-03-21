import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug de sección no proporcionado" }, { status: 400 });
  }

  const section = await prisma.section.findUnique({
    where: { slug },
    include: {
      contentType: true
    }
  });

  if (!section) {
    return NextResponse.json({ error: "Sección no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ section });
}