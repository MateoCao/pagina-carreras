export function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Eliminar caracteres especiales
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/--+/g, '-') // Eliminar múltiples guiones
      .trim();
  }
  
  export async function validateUniqueSlug(slug: string, parentId: number | null = null): Promise<boolean> {
    const res = await fetch(`/api/sections/validate-slug?slug=${slug}&parentId=${parentId}`);
    return res.ok;
  }