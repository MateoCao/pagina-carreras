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