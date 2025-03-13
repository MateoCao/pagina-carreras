import { prisma } from "@/lib/prisma";
import Image from "next/image";

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
      {section.files.map((fileUrl: string) => (
        fileUrl.endsWith(".pdf") ? (
          <a 
            key={fileUrl} 
            href={fileUrl} 
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Ver PDF
          </a>
        ) : (
          <Image 
            key={fileUrl} 
            src={fileUrl}
            width={200}
            height={200} 
            alt="Contenido multimedia" 
            className="object-cover"
          />
        )
      ))}
    </div>
  );
}