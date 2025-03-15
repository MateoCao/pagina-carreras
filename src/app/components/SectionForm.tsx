'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateSlug, validateUniqueSlug } from '../utils/slug';

interface Section {
  id: number;
  title: string;
  children: Section[];
  parentId: number | null;
}

export default function SectionForm() {
  const router = useRouter();
  const [slugError, setSlugError] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isFinalSection, setIsFinalSection] = useState(false);
  const [selectedPath, setSelectedPath] = useState<number[]>([]); // Ruta de selección
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    parentId: null as number | null,
    content: '',
    files: [] as File[],
  });

  // Cargar secciones existentes
  useEffect(() => {
    async function fetchSections() {
      const res = await fetch('/api/sections/tree');
      const data = await res.json();
      setSections(data);
    }
    fetchSections();
  }, []);

  // Manejar cambios en el título
  const handleTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = generateSlug(title);
    
    setFormData(prev => ({
      ...prev,
      title,
      slug: generatedSlug,
    }));
  
    // Validar slug
    const isValid = await validateUniqueSlug(generatedSlug, formData.parentId);
    setSlugError(isValid ? null : 'Este slug ya está en uso');
  };

  // Manejar cambios en el slug
  const handleSlugChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value;
    const isValid = await validateUniqueSlug(slug, formData.parentId);
    
    setFormData(prev => ({ ...prev, slug }));
    setSlugError(isValid ? null : 'Este slug ya está en uso');
  };

  // Manejar selección de sección padre
  const handleParentSelection = (sectionId: number | null, level: number) => {
    // Actualizar la ruta de selección
    const newPath = selectedPath.slice(0, level);
    if (sectionId !== null) {
      newPath.push(sectionId);
    }
    setSelectedPath(newPath);

    // Actualizar el padre seleccionado en el formulario
    setFormData(prev => ({ ...prev, parentId: sectionId }));
  };

  // Obtener las secciones actuales basadas en la ruta de selección
  const getCurrentSections = (level: number): Section[] => {
    if (level === 0) {
      // Nivel 0: solo secciones principales (sin padre)
      return sections.filter((section) => !section.parentId);
    }

    // Niveles superiores: subsecciones de la sección seleccionada
    let currentSections = sections;
    for (let i = 0; i < level; i++) {
      const section = currentSections.find((s) => s.id === selectedPath[i]);
      if (section && section.children) {
        currentSections = section.children;
      } else {
        return []; // Si no hay subsecciones, devolver un array vacío
      }
    }
    return currentSections;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = new FormData();
    form.append('title', formData.title);
    form.append('slug', formData.slug);
    form.append('order', '0');
    if (formData.parentId) form.append('parentId', formData.parentId.toString());
    if (isFinalSection) {
      form.append('content', formData.content);
      formData.files.forEach(file => form.append('files', file));
    }

    const res = await fetch('/api/sections', {
      method: 'POST',
      body: form,
    });

    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl text-black mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block mb-2 font-medium">Título:</label>
        <input
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Slug (URL):</label>
        <input
          readOnly
          type="text"
          value={formData.slug}
          onChange={handleSlugChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Selectores de sección padre */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Sección padre:</label>
        {/* Primer selector (siempre visible) */}
        <select
          value={selectedPath[0] ?? ''}
          onChange={(e) => handleParentSelection(Number(e.target.value), 0)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="">Ninguna (sección principal)</option>
          {getCurrentSections(0).map((section) => (
            <option key={section.id} value={section.id}>
              {section.title}
            </option>
          ))}
        </select>

        {/* Selectores adicionales (para subsecciones) */}
        {selectedPath.map((id, level) => {
          const currentSections = getCurrentSections(level + 1);
          if (!currentSections || currentSections.length === 0) return null; // No mostrar si no hay subsecciones

          return (
            <select
              key={level + 1}
              value={selectedPath[level + 1] ?? ''}
              onChange={(e) => handleParentSelection(Number(e.target.value), level + 1)}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">Ninguna (sección principal)</option>
              {currentSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          );
        })}
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isFinalSection}
            onChange={(e) => setIsFinalSection(e.target.checked)}
            className="form-checkbox"
          />
          <span>¿Es una sección final? (contendrá contenido y archivos)</span>
        </label>
      </div>

      {isFinalSection && (
        <>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Contenido:</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">Archivos:</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFormData({ ...formData, files: Array.from(e.target.files || []) })}
              className="w-full p-2 border rounded"
            />
          </div>
        </>
      )}

      {slugError && <div className="text-red-500 text-sm mt-1">{slugError}</div>}
      <button
        type="submit"
        disabled={!!slugError}
        className={`w-full py-2 px-4 rounded transition-colors ${
          slugError ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Crear Sección
      </button>
    </form>
  );
}