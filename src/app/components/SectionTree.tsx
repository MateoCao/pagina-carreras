'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: number;
  title: string;
  slug: string;
  children?: Section[]; // children es opcional
}

export default function SectionTree() {
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());

  // Cargar secciones existentes
  useEffect(() => {
    async function fetchSections() {
      const res = await fetch('/api/sections/tree');
      const data = await res.json();
      setSections(data);
    }
    fetchSections();
  }, []);

  // Manejar la expansión/colapso de secciones
  const toggleSection = (id: number) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Renderizar el árbol de secciones
  const renderTree = (sections: Section[], level = 0) => (
    <ul className={`pl-${level * 4}`}>
      {sections.map((section) => (
        <li key={section.id} className="my-2">
          <div
            className={`flex items-center cursor-pointer ${
              level === 0 ? 'font-bold text-blue-600' : 'text-gray-700'
            }`}
            onClick={() => toggleSection(section.id)}
          >
            <span className="mr-2">
              {section.children && section.children.length > 0 ? (
                expandedSections.has(section.id) ? '▼' : '▶'
              ) : (
                '•'
              )}
            </span>
            <span>{section.title}</span>
            <span className="ml-2 text-sm text-gray-500">({section.slug})</span>
          </div>
          {section.children && section.children.length > 0 && expandedSections.has(section.id) && (
            <div className={`ml-${level * 4}`}>
              {renderTree(section.children, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Previsualización del Árbol</h2>
      {sections.length > 0 ? (
        renderTree(sections)
      ) : (
        <p className="text-gray-500">No hay secciones creadas aún</p>
      )}
    </div>
  );
}