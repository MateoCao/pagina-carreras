'use client';
import { useSectionForm } from '../hooks/useSectionForm';
import { ParentSectionSelectors } from './ParentSectionSelectors';
import { SectionTypeSelector } from './SectionTypeSelector';
import { TableConfigurator } from './TableConfigurator';
import { SubmitButton } from './SubmitButton';

export default function SectionForm() {
  const {
    formData,
    setFormData,
    sections,
    selectedPath,
    slugError,
    isFinalSection,
    setIsFinalSection,
    handleTitleChange,
    handleSlugChange,
    handleParentSelection,
    handleCellFileChange,
    handleSubmit
  } = useSectionForm();

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl text-black mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Campos del título y slug */}
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
        <label className="block mb-2 font-medium">URL:</label>
        <input
          readOnly
          type="text"
          value={formData.title}
          onChange={handleSlugChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <ParentSectionSelectors
        sections={sections}
        selectedPath={selectedPath}
        handleParentSelection={handleParentSelection}
      />

      {/* Checkbox de sección final */}
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

      <SectionTypeSelector
        sectionType={formData.sectionType}
        setSectionType={(type) => setFormData(prev => ({ ...prev, sectionType: type }))}
      />

      {isFinalSection && formData.sectionType === 'table' && (
        <TableConfigurator
          formData={formData}
          setFormData={setFormData}
          handleCellFileChange={handleCellFileChange}
        />
      )}

      {slugError && <div className="text-red-500 text-sm mt-1">{slugError}</div>}
      <SubmitButton slugError={slugError} />
    </form>
  );
}