import { useState, useEffect } from 'react';
import { Section, TableCellFile, CellData } from '@/types/section';
import type { FormData } from '@/types/section';
import { generateSlug, validateUniqueSlug } from '../utils/slug';

export const useSectionForm = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedPath, setSelectedPath] = useState<number[]>([]);
  const [slugError, setSlugError] = useState<string | null>(null);
  const [isFinalSection, setIsFinalSection] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    parentId: null,
    content: '',
    files: [],
    sectionType: 'mixed',
    rows: 1,
    columns: 2,
    columnHeaders: ['Fila', 'Columna 1'],
    rowNames: ['Fila 1'],
    cellFiles: [[null]],
  });

   useEffect(() => {
      async function fetchSections() {
        const res = await fetch('/api/sections/tree');
        const data = await res.json();
        setSections(data);
      }
      fetchSections();
    }, []);
  
    useEffect(() => {
      if (formData.sectionType === 'table') {
        const columns = Math.max(2, formData.columns);
        const rows = Math.max(1, formData.rows);
        
        setFormData(prev => {
          const newColumnHeaders = Array(columns)
            .fill('')
            .map((_, i) => 
              i < prev.columnHeaders.length ? 
              prev.columnHeaders[i] : 
              i === 0 ? 'Fila' : `Columna ${i}`
            );
    
          const newRowNames = Array(rows)
            .fill('')
            .map((_, i) => 
              i < prev.rowNames.length ? 
              prev.rowNames[i] : 
              `Fila ${i + 1}`
            );
    
          const newCellFiles = Array(rows)
            .fill(null)
            .map((_, row) => 
              Array(columns - 1)
                .fill(null)
                .map((_, col) => 
                  row < prev.cellFiles.length && col < prev.cellFiles[row]?.length ? 
                  prev.cellFiles[row][col] : 
                  null
                )
            );
    
          return {
            ...prev,
            columns,
            rows,
            columnHeaders: newColumnHeaders,
            rowNames: newRowNames,
            cellFiles: newCellFiles
          };
        });
      }
    }, [formData.rows, formData.columns, formData.sectionType]);
  
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
      console.log(selectedPath);
  
      // Actualizar el padre seleccionado en el formulario
      setFormData(prev => ({ ...prev, parentId: sectionId as number | null }));
    };

    const handleCellFileChange = (row: number, col: number, file: File | null) => {
      setFormData(prev => {
        const newCellFiles = prev.cellFiles.map(row => [...row]);
        const newFile = file ? { file, row, column: col + 1 } : null;
        
        if (!newCellFiles[row]) {
          newCellFiles[row] = [];
        }
        
        newCellFiles[row][col] = newFile;
        
        return { ...prev, cellFiles: newCellFiles };
      });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const form = new FormData();
        form.append('title', formData.title);
        form.append('slug', formData.slug);
        form.append('order', '0');
        form.append('sectionType', formData.sectionType);

        console.log(formData.parentId);

        
        if (formData.parentId) form.append('parentId', formData.parentId.toString());
      
        // Para ambos tipos de sección final
        if (isFinalSection) {
          if (formData.sectionType === 'mixed') {
            // Contenido mixto
            form.append('content', formData.content);
            formData.files.forEach(file => form.append('files', file));
          } else if (formData.sectionType === 'table') {
            // Tabla de archivos
            const tableData = {
              columnHeaders: formData.columnHeaders,
              rowNames: formData.rowNames,
              cells: [] as CellData[]
            };
      
            // Procesar archivos de celdas
            const fileUploadPromises = formData.cellFiles.flatMap((row, rowIndex) => 
              row.map(async (file, colIndex) => {
                if (file) {
                  const fileUrl = await uploadFile(file); // Necesitarás implementar esta función
                  return {
                    row: rowIndex,
                    column: colIndex + 1, // +1 porque la primera columna es para nombres
                    url: fileUrl,
                    fileName: file.file?.name,
                    type: file.file?.type
                  };
                }
                return null;
              })
            );
      
            const uploadedFiles = (await Promise.all(fileUploadPromises)).filter(Boolean);
            tableData.cells = uploadedFiles.filter(file => file !== null) as CellData[];
      
            form.append('tableData', JSON.stringify(tableData));
          }
        }
      
        const res = await fetch('/api/sections', {
          method: 'POST',
          body: form,
        });
      
        if (res.ok) {
          console.log("CREADA SATISFSC")
        } else {
          const errorData = await res.json();
          console.error('Error creating section:', errorData);
        }
      };
      
      // Función auxiliar para subir archivos (añadir al componente)
      const uploadFile = async (file: TableCellFile) => {
        if (!file.file) {
          throw new Error('File is null');
        }
      
        const formData = new FormData();
        formData.append('file', file.file);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!res.ok) throw new Error('File upload failed');
        const data = await res.json();
        return data.url;
      };

  
  return {
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
  };
};