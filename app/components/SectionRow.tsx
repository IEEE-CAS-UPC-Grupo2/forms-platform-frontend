import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Section } from "../models";

interface SectionProps {
  section: Section;
  onToggle: () => void;
  isExpanded: boolean;
}

const SectionRow: React.FC<SectionProps> = ({
  section,
  onToggle,
  isExpanded,
}) => {
  return (
    <div className="flex items-center border-b border-cas-gray-light py-3 min-h-[2.5rem]">
      <div className="flex items-center justify-center w-1/12 px-6 text-center">
        {section.subsections && section.subsections.length > 0 ? (
          <button onClick={onToggle} className="mr-2">
            <FontAwesomeIcon
              icon={isExpanded ? faCaretDown : faCaretRight}
              size="sm"
              className="h-4 w-4 text-cas-white bg-cas-green rounded-full p-[0.35rem] hover:shadow-md hover:opacity-90"
            />
          </button>
        ) : (
          <span>-</span>
        )}
      </div>

      <div className="w-5/12 px-6">{section.name}</div>
      <div className="w-6/12 px-6">{section.path}</div>
    </div>
  );
};

export default SectionRow;
