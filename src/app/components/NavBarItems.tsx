import { NavbarSection } from "../utils/transformSections";
import Link from "next/link";

interface NavbarItemsProps {
  currentSection: NavbarSection;
  setBreadcrumb: React.Dispatch<React.SetStateAction<NavbarSection[]>>;
  breadcrumb: NavbarSection[];
}

export const NavbarItems = ({ currentSection, setBreadcrumb, breadcrumb }: NavbarItemsProps) => {
  return (
    <ul className="flex flex-col gap-2 text-xl">
      {currentSection.subsections.map((sub) => (
        <li
          key={sub.slug}
          className="cursor-pointer hover:text-gray-400 transition-normal duration-200 ease-in-out"
        >
          {sub.subsections.length > 0 ? ( // Si tiene subsecciones, es un nodo padre
            <div onClick={() => setBreadcrumb([...breadcrumb, sub])}>
              {sub.name.toUpperCase()}
            </div>
          ) : ( // Si no tiene subsecciones, es una hoja
            <Link href={`/sections/${sub.slug}`}>
              {sub.name.toUpperCase()}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};