import { prisma } from "@/lib/prisma";

export default async function SectionPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  if (!params.id) {
    return <div>ID no proporcionado</div>;
  }

  const sectionId = Number(params.id);
  

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