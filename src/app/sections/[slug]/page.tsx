import { prisma } from "@/lib/prisma";
import { TableView } from "@/app/components/TableView";

// En tu página/componente donde muestras la sección
async function getSectionData(slug: string) {
  const section = await prisma.section.findUnique({
    where: { slug },
    include: {
      contentType: true
    }
  });

  if (!section || !section.contentType || section.contentType.type !== 'table') {
    return null;
  }

  return {
    title: section.title,
    tableData: section.contentType.tableData as {
      columnHeaders: string[];
      rowNames: string[];
      cells: Array<{
        row: number;
        column: number;
        url: string;
        fileName: string;
        type: 'pdf' | 'csv';
      }>;
    }
  };
}

export default async function SectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const sectionSlug = params.slug
  const sectionData = await getSectionData(sectionSlug);

  if (!sectionData) {
    return (
      <div className="p-6 text-red-500">
        Sección no encontrada o no es una tabla
      </div>
    );
  }

  return (
    <TableView
      title={sectionData.title}
      tableData={sectionData.tableData}
    />
  );
}