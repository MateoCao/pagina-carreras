'use client';

import { FormData } from '@/types/section';
import { FileInputCell } from './FileInputCell';

interface TableConfiguratorProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleCellFileChange: (row: number, col: number, file: File | null) => void;
}

export const TableConfigurator = ({
  formData,
  setFormData,
  handleCellFileChange
}: TableConfiguratorProps) => {
  const handleColumnHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...formData.columnHeaders];
    newHeaders[colIndex + 1] = value;
    setFormData(prev => ({ ...prev, columnHeaders: newHeaders }));
  };

  const handleRowNameChange = (rowIndex: number, value: string) => {
    const newRowNames = [...formData.rowNames];
    newRowNames[rowIndex] = value;
    setFormData(prev => ({ ...prev, rowNames: newRowNames }));
  };

  return (
    <div className=" w-full text-white text-sm">
      <div>
        {/* Encabezados de Columnas */}
        <div className={`grid grid-cols-12 w-full`}>
          <div className="col-span-1 font-medium">{formData.columnHeaders[0]}</div>
          {formData.columnHeaders.slice(1).map((header, colIndex) => (
            <input
              key={`header-${colIndex}`}
              type="text"
              value={header || ""}
              onChange={(e) => handleColumnHeaderChange(colIndex, e.target.value)}
              className="p-1 border h-12  bg-gray-700 border-gray-800"
            />
          ))}
        </div>

        {/* Filas y celdas */}
        {Array(formData.rows).fill(null).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid text-white  grid-cols-12 items-center">
            <input
              type="text"
              value={formData.rowNames[rowIndex] || ""}
              onChange={(e) => handleRowNameChange(rowIndex, e.target.value)}
              className="p-1 border bg-gray-700 border-gray-800 h-12"
            />

            {Array(formData.columns - 1).fill(null).map((_, colIndex) => (
              <FileInputCell
                key={`cell-${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                file={formData.cellFiles[rowIndex]?.[colIndex]}
                handleCellFileChange={handleCellFileChange}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};