// app/sections/page.tsx
import { prisma } from "@/lib/prisma";
import Image from "next/image";

async function getSections() {
  return await prisma.section.findMany();
}

export default async function PublicSections() {
  const sections = await getSections();

  return (
    <div className="container mx-auto p-4">
      {sections.map((section) => (
        <div key={section.id} className="mb-8 p-4 border rounded">
          <h2 className="text-xl mb-2">{section.title}</h2>
          <div className="grid grid-cols-3 gap-4">
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
                  className="w-full h-48 object-cover"
                />
              )
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}