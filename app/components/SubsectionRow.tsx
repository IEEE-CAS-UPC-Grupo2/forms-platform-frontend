import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import { Subsection } from "../models";

interface SubsectionProps {
  subsection: Subsection;
  onEdit: (subsectionId: string) => void;
}

const SubsectionRow: React.FC<SubsectionProps> = ({ subsection, onEdit }) => {
  return (
    <div className="flex items-center border-b border-cas-gray-light text-sm py-2">
      <div className="w-1/12 px-6 text-center"></div>
      <div className="w-5/12 px-6">{subsection.title}</div>
      <div className="w-4/12 px-6">{subsection.path}</div>
      <div className="w-3/12 px-6 pr-[2.5rem] text-right ml-auto">
        <button
          onClick={() => onEdit(subsection.id)}
          className="text-blue-500 hover:text-blue-700"
          title="Editar subsección"
        >
          <FontAwesomeIcon
            icon={faPencil}
            size="lg"
            className="h-4 w-4 text-cas-white bg-cas-green rounded-full p-[0.35rem] hover:shadow-md hover:opacity-90"
          />
        </button>
      </div>
    </div>
  );
};

export default SubsectionRow;
