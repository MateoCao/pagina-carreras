'use client';

import { TableCellFile } from '@/types/section';

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
}: FileInputCellProps) => (
  <div className="relative">
    <input
      type="file"
      accept=".pdf,.csv"
      onChange={(e) => handleCellFileChange(
        rowIndex,
        colIndex,
        e.target.files?.[0] || null
      )}
      className="w-full"
    />
    {file?.file && (
      <span className="absolute top-0 right-0 text-sm bg-gray-100 px-2">
        ✔
      </span>
    )}
  </div>
);