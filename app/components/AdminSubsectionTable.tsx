import { useRouter } from "next/navigation";
import { Subsection } from "../models";
import SubsectionRow from "./SubsectionRow";
import { ADMIN_ROUTES } from "../admin/routes";

interface SubsectionTableProps {
  subsections: Subsection[];
}

const SubsectionTable: React.FC<SubsectionTableProps> = ({ subsections }) => {
  const router = useRouter();
  const onEditSubsection = (id: string) => {
    router.push(`${ADMIN_ROUTES.PANEL.WEBSITE}/${id}`);
  };

  return (
    <div className="bg-cas-white">
      <div className="flex font-semibold border-b border-cas-gray-light text-sm">
        <div className="w-1/12 px-6 py-3 text-center"></div>
        <div className="w-5/12 px-6 py-3">Nombre de la subsección</div>
        <div className="w-4/12 px-6 py-3">Ruta</div>
        <div className="w-3/12 px-6 py-3 text-right">Opciones</div>
      </div>
      {subsections.map((subsection) => (
        <SubsectionRow
          key={subsection.id}
          subsection={subsection}
          onEdit={onEditSubsection}
        />
      ))}
    </div>
  );
};

export default SubsectionTable;
