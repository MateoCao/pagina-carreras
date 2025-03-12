// app/api/get-section-title/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get("id")!, 10);

  if (!id) {
    return NextResponse.json({ error: "ID de sección no proporcionado" }, { status: 400 });
  }

  const section = await prisma.section.findUnique({
    where: { id },
  });

  if (!section) {
    return NextResponse.json({ error: "Sección no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ title: section.title });
}
