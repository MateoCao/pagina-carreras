interface SectionTypeSelectorProps {
    sectionType: string;
    setSectionType: (type: string) => void;
  }
  
  export const SectionTypeSelector = ({
    sectionType,
    setSectionType
  }: SectionTypeSelectorProps) => (
    <div className="mb-4">
      <label>Tipo de Sección:</label>
      <select
        value={sectionType}
        onChange={(e) => setSectionType(e.target.value)}
      >
        <option value="mixed">Contenido Mixto</option>
        <option value="table">Tabla de Archivos</option>
      </select>
    </div>
  );