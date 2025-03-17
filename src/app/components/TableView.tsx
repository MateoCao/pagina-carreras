import { useMemo } from "react";

interface TableViewProps {
    title: string;
    tableData: {
      columnHeaders: string[];
      rowNames: string[];
      cells: {
        row: number;
        column: number;
        url: string;
        fileName: string;
        type: 'pdf' | 'csv';
      }[];
    };
  }
  
  export function TableView({ title, tableData }: TableViewProps) {
    // Organizar las celdas en estructura de matriz
    const tableCells = useMemo(() => {
      const matrix: (typeof tableData.cells[0] | null)[][] = 
        Array(tableData.rowNames.length)
          .fill(null)
          .map(() => Array(tableData.columnHeaders.length - 1).fill(null));
  
      tableData.cells.forEach(cell => {
        if (matrix[cell.row] && cell.column - 1 < matrix[cell.row].length) {
          matrix[cell.row][cell.column - 1] = cell;
        }
      });
  
      return matrix;
    }, [tableData]);
  
    return (
      <div className="p-6 text-black">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                {tableData.columnHeaders.map((header, index) => (
                  <th 
                    key={index}
                    className="bg-gray-100 border border-gray-300 p-3 text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {tableData.rowNames.map((rowName, rowIndex) => (
                <tr key={rowIndex}>
                  {/* Nombre de la fila */}
                  <td className="border border-gray-200 p-3 font-medium bg-gray-50">
                    {rowName}
                  </td>
                  
                  {/* Celdas de archivos */}
                  {tableCells[rowIndex].map((cell, colIndex) => (
                    <td 
                      key={colIndex}
                      className="border border-gray-200 p-3"
                    >
                      {cell ? (
                        <a
                          href={cell.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <FileIcon type={cell.type} />
                          <span className="ml-2">{cell.fileName}</span>
                        </a>
                      ) : (
                        <span className="text-gray-400">Vacío</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
  // Componente para iconos de archivo
  function FileIcon({ type }: { type: 'pdf' | 'csv' }) {
    const iconClass = type === 'pdf' 
      ? 'text-red-500' 
      : 'text-green-500';
  
    return (
      <svg
        className={`w-5 h-5 ${iconClass}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {type === 'pdf' ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        )}
      </svg>
    );
  }