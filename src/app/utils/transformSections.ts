import { Section as ApiSection } from '../../types/section';

export interface NavbarSection {
  id: number;
  name: string;
  slug: string;
  subsections: NavbarSection[];
}

export function transformSections(apiSections: ApiSection[]): NavbarSection[] {
  return apiSections.map((section) => ({
    id: section.id,
    name: section.title,
    slug: section.slug,
    subsections: section.children ? transformSections(section.children) : [],
  }));
}