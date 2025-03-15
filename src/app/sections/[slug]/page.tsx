import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const sectionSlug = params.slug
  const section = await prisma.section.findUnique({
    where: { slug: sectionSlug },
    include: { contentType: true },
  });

  if (!section) {
    return notFound();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{section.title}</h1>
      {section.contentType && (
        <div>
          <p className="mb-4">{section.contentType.content}</p>
          {section.contentType.files.map((file, index) => (
            <div key={index} className="mb-2">
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver PDF {index + 1}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}