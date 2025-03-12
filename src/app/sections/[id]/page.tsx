// app/secciones/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/server/request/params";


export default async function SectionPage({ params }: { params: Params }) {
  const paramsSection = await params;
  const sectionId = Number(paramsSection.id);

  const section = await prisma.section.findUnique({
    where: { id: sectionId },
  });
  if (!section) {
    return <div>Sección no encontrada</div>;
  }

  return (
    <div>
      <h1>{section.title}</h1>
      <p>{section.content}</p>
      {/* Aquí puedes mostrar más detalles de la sección */}
    </div>
  );
}