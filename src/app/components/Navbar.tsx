"use client";

import Link from "next/link";
import { transformSections } from "../utils/transformSections";
import { NavBarMain } from "./NavBarMain";
import useSWR from "swr";
import { LoadingScreen } from "./LoadingScreen";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Navbar() {

  const { data: sec , error, isLoading } = useSWR("/api/sections/tree", fetcher, {
  });

  if (error) {
      return <div>Error al cargar las secciones</div>;
    }
    
    if (isLoading) {
      return (
        <LoadingScreen />
      );
    }

  const sections = transformSections(sec);
  return (
    <nav className="flex flex-col fixed top-0 left-0 shadow-lg max-h-lvh gap-5 p-5 h-full bg-gradient-to-r from-red-900 to-black
 text-[#f5f5f5] w-60">
      <h2 className="text-3xl text-center">
        <Link href="/">TC 2000</Link>
      </h2>
      <NavBarMain sections={sections} />
    </nav>
  );
}