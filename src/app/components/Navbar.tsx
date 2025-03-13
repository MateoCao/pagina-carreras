"use client";

import { Section } from "@/types/section";
import Link from "next/link";
import useSWR from "swr";

// FETCH 
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Navbar({ fallbackData }: { fallbackData?: Section[] }) {
  const { data: sections, error } = useSWR("/api/get-sections-title", fetcher, {
    suspense: true, 
    fallbackData,
  });

  if (error) {
    return <div>Error al cargar las secciones</div>;
  }

  return (
    <nav className="flex flex-col gap-5 h-lvh p-5 bg-linear-to-b from-gray-900 to-red-600  text-white w-60">
      <h2 className="text-3xl text-center">
        <Link href="/">TC 2000</Link>
      </h2>
      <ul className="flex flex-col gap-3 text-xl">
        {sections.map((section: Section) => (
          <li className="cursor-pointer hover:text-gray-400 transition-normal duration-200 ease-in-out" key={section.id}>
            <Link href={`/sections/${section.id}`}>{section.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}