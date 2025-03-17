export type Section = {
    id: number;
    title: string;
    slug: string;
    parentId: number | null;
    order: number;
    contentId: number | null;
    createdAt: Date;
    updatedAt: Date;
    children?: Section[];   
  };

export interface TableCellData {
  row: number;
  column: number;
  url: string;
  fileName: string;
  type: string;
}

export interface TableData {
  columnHeaders: string[];
  rowNames: string[];
  cells: TableCellData[];
}

export interface TableCellFile {
  file: File | null;
  row: number;
  column: number;
}

export interface SectionFormState {
  title: string;
  slug: string;
  parentId: number | null;
  content: string;
  files: File[];
  sectionType: 'mixed' | 'table';
  rows: number;
  columns: number;
  columnHeaders: string[];
  rowNames: string[];
  cellFiles: (TableCellFile | null)[][];
}

export interface FormSection {
  id: number;
  title: string;
  children: Section[];
  parentId: number | null;
}

export interface FormData {
  title: string;
  slug: string;
  parentId: number | null;
  content: string;
  files: never[];
  sectionType: string;
  rows: number;
  columns: number;
  columnHeaders: string[];
  rowNames: string[];
  cellFiles: (TableCellFile | null)[][];
}

export interface CellData {
  row: number;
  column: number;
  url: string;
  fileName: string;
  type: string;
}