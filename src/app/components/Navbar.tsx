"use client";

import Link from "next/link";
import useSWR from "swr";
import { transformSections } from "../utils/transformSections";
import { NavBarMain } from "./NavBarMain";

// FETCH 
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Navbar() {
  // Usar SWR con Suspense para obtener las secciones
  const { data: sec, error, isLoading } = useSWR("/api/sections/tree", fetcher, {
  });

  // Transformar las secciones
  
  if (error) {
    return <div>Error al cargar las secciones</div>;
  }
  
  if (isLoading) {
    return (
    <nav className="flex flex-col gap-5 h-lvh p-5 bg-linear-to-b from-gray-900 to-red-600 text-white w-60">
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    </nav>
    );
  }
  
  const sections = transformSections(sec);
  return (
    <nav className="flex flex-col gap-5 h-lvh p-5 bg-linear-to-b from-gray-900 to-red-600 text-white w-60">
      <h2 className="text-3xl text-center">
        <Link href="/">TC 2000</Link>
      </h2>
      <NavBarMain sections={sections} />
    </nav>
  );
}