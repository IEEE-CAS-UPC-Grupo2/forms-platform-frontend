import { useState } from "react";
import { Section } from "../models";
import SectionRow from "./SectionRow";
import SubsectionTable from "./AdminSubsectionTable";
import { updateOrderSections } from "../api/section";

interface TablaProps {
  sections: Section[];
}

export function AdminSectionTable({ sections }: TablaProps) {
  const [sectionList, setSectionList] = useState<Section[]>(sections);
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

  const moveSectionUp = async (index: number) => {
    if (index === 0) return;
    const newSections = [...sectionList];
    const [removed] = newSections.splice(index, 1);
    newSections.splice(index - 1, 0, removed);
    setSectionList(newSections);

    await updateOrderSections({
      orderX: index + 1,
      orderY: index,
    });
  };

  const moveSectionDown = async (index: number) => {
    if (index === sectionList.length - 1) return;
    const newSections = [...sectionList];
    const [removed] = newSections.splice(index, 1);
    newSections.splice(index + 1, 0, removed);
    setSectionList(newSections);

    await updateOrderSections({
      orderX: index + 1,
      orderY: index + 2,
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
          <div className="w-1/12 px-2 py-3 pr-[2.4rem] text-right">Ordenar</div>
        </div>
        {sectionList.map((section, index) => (
          <div key={section.id}>
            <SectionRow
              section={section}
              onToggle={() => toggleSection(section.id)}
              isExpanded={expandedSections.has(section.id)}
              onMoveUp={() => moveSectionUp(index)}
              onMoveDown={() => moveSectionDown(index)}
              index={index}
              totalSections={sectionList.length}
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
