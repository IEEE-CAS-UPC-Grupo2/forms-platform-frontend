import { useState } from "react";
import { Section } from "../models";
import SectionRow from "./SectionRow";
import SubsectionTable from "./AdminSubsectionTable";

interface TablaProps {
  sections: Section[];
}

export function AdminSectionTable({ sections }: TablaProps) {
  const [sectionList] = useState<Section[]>(sections);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 py-5 rounded-t-lg">
        <h2 className="text-lg font-semibold px-4">
          Detalles de las secciones
        </h2>
      </div>

      <div className="h-[32rem] overflow-y-auto border border-cas-gray-light rounded-b-lg">
        <div className="flex bg-gray-100 font-semibold border-b border-cas-gray-light">
          <div className="w-1/12 px-6 py-3 text-center"></div>
          <div className="w-5/12 px-6 py-3">Nombre de la sección</div>
          <div className="w-6/12 px-6 py-3">Ruta</div>
        </div>

        {sectionList.map((section) => (
          <div
            key={section.id}
            className={`${
              expandedSections.has(section.id) ? "bg-cas-gray-light" : ""
            }`}
          >
            <SectionRow
              section={section}
              onToggle={() => toggleSection(section.id)}
              isExpanded={expandedSections.has(section.id)}
            />

            {expandedSections.has(section.id) &&
              section.subsections?.length > 0 && (
                <SubsectionTable subsections={section.subsections} />
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
