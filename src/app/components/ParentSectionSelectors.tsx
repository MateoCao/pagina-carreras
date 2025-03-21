import { Section } from '@/types/section';

interface ParentSectionSelectorsProps {
  sections: Section[];
  selectedPath: number[];
  handleParentSelection: (sectionId: number | null, level: number) => void;
}

export const ParentSectionSelectors = ({
  sections,
  selectedPath,
  handleParentSelection
}: ParentSectionSelectorsProps) => {
    
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

  return (
    <div className="mb-4 text-gray-100 w-1/2">
      <label className="block mb-2 font-medium">Sección padre:</label>
      {[0, ...selectedPath].map((id, level) => {
        const currentSections = getCurrentSections(level);
        if (!currentSections || currentSections.length === 0) return null;

        return (
          <select
            key={level}
            value={selectedPath[level] ?? ''}
            onChange={(e) => handleParentSelection(Number(e.target.value), level)}
            className="w-full p-2 rounded mb-2 bg-gray-700 cursor-pointer outline-0"
          >
            <option value="">Ninguna (sección principal)</option>
            {currentSections.map((section) => (
              <option className='cursor-pointer outline-0' key={section.id} value={section.id}>
                {section.title}
              </option>
            ))}
          </select>
        );
      })}
    </div>
  );
};