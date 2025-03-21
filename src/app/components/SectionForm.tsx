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
    <section className='w-full h-full mt-2 '>
      <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
          <div className='min-w-lg text-white p-6 rounded-lg shadow-md'>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Título:</label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder='Título de la sección'	
                className="p-2 w-1/2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
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
                placeholder='URL'	
                className="p-2 w-1/2 border-b border-gray-200 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <ParentSectionSelectors
              sections={sections}
              selectedPath={selectedPath}
              handleParentSelection={handleParentSelection}
            />

            {/* Checkbox de sección final */}
            <div className="mb-4 w-1/2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isFinalSection}
                  onChange={(e) => setIsFinalSection(e.target.checked)}
                  className="form-checkbox cursor-pointer"
                />
                <span>¿Es una sección final? (contendrá contenido y archivos)</span>
              </label>
            </div>

            <SectionTypeSelector
              sectionType={formData.sectionType}
              setSectionType={(type) => setFormData(prev => ({ ...prev, sectionType: type }))}
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Filas:</label>
                <input
                  type="number"
                  min="1"
                  max={20}
                  value={formData.rows}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    rows: Math.max(1, +e.target.value)
                  }))}
                  className="w-full p-2 border rounded border-gray-700 focus:border-gray-600 outline-0"
                />
              </div>
              <div>
                <label>Columnas:</label>
                <input
                  type="number"
                  min="2"
                  max={12}
                  value={formData.columns}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    columns: Math.max(2, +e.target.value)
                  }))}
                  className="w-full p-2 border rounded border-gray-700 focus:border-gray-600 outline-0"
                />
              </div>
            </div>
          </div>
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
      </>
    </section>
    
  );
}