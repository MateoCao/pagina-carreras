import { prisma } from "@/lib/prisma";

export default async function SectionPage({ params }: { params: { id: string } }) {
  // Verifica que params.id esté definido
  if (!params.id) {
    return <div>ID no proporcionado</div>;
  }

  // Convierte params.id a número
  const sectionId = Number(params.id);

  // Obtén la sección desde Prisma
  const section = await prisma.section.findUnique({
    where: { id: sectionId },
  });

  // Si no se encuentra la sección, muestra un mensaje
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