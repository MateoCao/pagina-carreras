"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarSection } from "../utils/transformSections";
import { NavbarItems } from "./NavBarItems";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

interface NavBarMainProps {
  sections: NavbarSection[];
}

export const NavBarMain = ({ sections }: NavBarMainProps) => {
  const [breadcrumb, setBreadcrumb] = useState<NavbarSection[]>([]);

  const currentSection = breadcrumb.length > 0 ? breadcrumb[breadcrumb.length - 1] : null;

  return (
    <div className="p-4">
      <AnimatePresence mode="wait">
        {!currentSection && (
          <motion.ul
            key="main"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <li className="cursor-pointer hover:text-gray-400 text-xl">
              <Link href="/"> Home </Link>
            </li>
            <li className="cursor-pointer hover:text-gray-400 text-xl">
              <Link href="/livetiming"> Livetiming </Link>
            </li>
            {sections.map((section) => (
              <li
                key={section.slug}
                onClick={() => setBreadcrumb([section])}
                className="cursor-pointer hover:text-gray-400 text-xl"
              >
                {section.subsections.length > 0 ? (
                    <div>{section.name.toUpperCase()}</div>
                ): (
                  <Link href={`/sections/${section.slug}`}> {section.name.toUpperCase()} </Link>
                )}
              </li>
            ))}
          </motion.ul>
        )}

        {currentSection && (
          <motion.div
            key={currentSection.slug}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          > 
            <NavbarItems currentSection={currentSection} setBreadcrumb={setBreadcrumb} breadcrumb={breadcrumb} />
            <button
              className="mt-3 cursor-pointer hover:text-gray-400 transition-normal duration-200 ease-in-out"
              onClick={() => setBreadcrumb(breadcrumb.slice(0, -1))}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="fa-fw" />
              Volver
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};