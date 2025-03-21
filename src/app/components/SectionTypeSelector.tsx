interface SectionTypeSelectorProps {
    sectionType: string;
    setSectionType: (type: string) => void;
  }
  
  export const SectionTypeSelector = ({
    sectionType,
    setSectionType
  }: SectionTypeSelectorProps) => (
    <div className="mb-4 w-1/2">
      <label className="mr-2">Tipo de Sección:</label>
      <select
        className="p-2 rounded mb-2 bg-gray-700 cursor-pointer outline-0"
        value={sectionType}
        onChange={(e) => setSectionType(e.target.value)}
      >
        <option value="mixed">Contenido Mixto</option>
        <option value="table">Tabla de Archivos</option>
      </select>
    </div>
  );