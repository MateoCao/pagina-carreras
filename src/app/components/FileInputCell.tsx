'use client';

import { TableCellFile } from '@/types/section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface FileInputCellProps {
  rowIndex: number;
  colIndex: number;
  file: TableCellFile | null;
  handleCellFileChange: (row: number, col: number, file: File | null) => void;
}

export const FileInputCell = ({
  rowIndex,
  colIndex,
  file,
  handleCellFileChange
}: FileInputCellProps) => {
  // Estado para mostrar el nombre del archivo en hover
  const [showFileName, setShowFileName] = useState(true);

  console.log(file?.file?.name);

  return (
    <div className="border h-12 bg-gray-600 border-gray-700">
      <input
        id={`file-input-${rowIndex}-${colIndex}`} // Un id único para asociar el label
        type="file"
        accept=".pdf,.csv"
        onChange={(e) => handleCellFileChange(
          rowIndex,
          colIndex,
          e.target.files?.[0] || null
        )}
        className="hidden" // Escondemos el input real
      />
      
      {/* Etiqueta personalizada con ícono de archivo (solo si no hay archivo cargado) */}
      {!file?.file && (
        <label
          htmlFor={`file-input-${rowIndex}-${colIndex}`}
          className="w-full h-full bg-gray-600 text-white hover:text-gray-400 flex justify-center items-center cursor-pointer space-x-2"
        >
          <FontAwesomeIcon icon={faPaperclip} className="h-6 w-6" />
        </label>
      )}

      {/* Si hay un archivo cargado, mostramos el ícono de eliminar y el nombre del archivo */}
      {file?.file && (
        <div 
          onMouseEnter={() => setShowFileName(true)}
          onMouseLeave={() => setShowFileName(false)}
          className="flex items-center jusitfy-center w-full h-full">
          {/* Ícono de eliminar archivo */}
          <FontAwesomeIcon
            icon={faX} 
            className="h-6 w-6 text-white mx-auto cursor-pointer hover:text-red-500 hover:opacity-60 z-10" 
            onClick={() => handleCellFileChange(rowIndex, colIndex, null)} 
          />

          {/* Nombre del archivo con hover */}
          <div
            className="relative"
          >
            {/* Mostrar el nombre del archivo en hover */}
            {showFileName && (
              <div className="absolute right-0 bottom-0  bg-black text-white text-xs px-2 py-1 rounded">
                {file.file.name}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
