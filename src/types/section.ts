export interface Section {
    id: number;
    title: string;
    content: string | null;
    files: string[];
    createdAt: Date;
    updatedAt: Date;
}