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
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Filas:</label>
          <input
            type="number"
            min="1"
            value={formData.rows}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              rows: Math.max(1, +e.target.value)
            }))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>Columnas:</label>
          <input
            type="number"
            min="2"
            value={formData.columns}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              columns: Math.max(2, +e.target.value)
            }))}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Encabezados de Columnas */}
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-1 font-medium">{formData.columnHeaders[0]}</div>
          {formData.columnHeaders.slice(1).map((header, colIndex) => (
            <input
              key={`header-${colIndex}`}
              type="text"
              value={header || ""}
              onChange={(e) => handleColumnHeaderChange(colIndex, e.target.value)}
              className="p-2 border rounded"
            />
          ))}
        </div>

        {/* Filas y celdas */}
        {Array(formData.rows).fill(null).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid grid-cols-6 gap-4 items-center">
            <input
              type="text"
              value={formData.rowNames[rowIndex] || ""}
              onChange={(e) => handleRowNameChange(rowIndex, e.target.value)}
              className="p-2 border rounded"
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