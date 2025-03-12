// components/Navbar.tsx
"use client";

import Link from "next/link";
import useSWR from "swr";

// Función para hacer la solicitud fetch
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Navbar() {
  // Usar SWR para obtener los datos
  const { data: sections, error } = useSWR("/api/get-sections-title", fetcher, {
    suspense: true, // Habilita el modo Suspense
  });

  // Si hay un error, puedes manejarlo aquí
  if (error) {
    return <div>Error al cargar las secciones</div>;
  }

  return (
    <nav>
      <Link href="/">Inicio</Link>
      <ul>
        {sections.map((section: any) => (
          <li key={section.id}>
            <Link href={`/secciones/${section.id}`}>{section.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}