"use client";

import useSWR from "swr";
import { useParams } from "next/navigation";
import { TableView } from "@/app/components/TableView";
import LoadingSpinner from "@/app/components/LoadingSpinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SectionPage() {
  const params = useParams();
  const slug = params.slug;

  console.log("🔍 Slug obtenido:", slug);

  const { data, isLoading, error } = useSWR(
    slug ? `/api/get-section-data?slug=${slug}` : null,
    fetcher
  );

  console.log(data)

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data?.section) {
    return (
      <div className="p-6 text-red-500">
        Sección no encontrada o no es una tabla
      </div>
    );
  }

  return <TableView title={data.section.title} tableData={data.section.contentType.tableData} />;
}
