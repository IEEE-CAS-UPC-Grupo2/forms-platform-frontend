import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCaretDown,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Section } from "../models";

interface SectionProps {
  section: Section;
  onToggle: () => void;
  isExpanded: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  index: number;
  totalSections: number;
}

const SectionRow: React.FC<SectionProps> = ({
  section,
  onToggle,
  isExpanded,
  onMoveUp,
  onMoveDown,
  index,
  totalSections
}) => {
  const isFirst = index === 0;
  const isLast = index === totalSections - 1;

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
      <div className="w-1/12 px-6 flex justify-center items-center text-center">
        {!isFirst && (
          <>
            <button
              onClick={onMoveUp}
              disabled={index === 1}
              className="text-blue-500 hover:text-blue-700 mr-2"
            >
              <FontAwesomeIcon
                icon={faArrowUp}
                size="sm"
                className={`h-4 w-4 text-cas-white rounded-full p-[0.35rem] hover:shadow-md hover:opacity-90 ${
                  index === 1 ? "bg-cas-gray-light" : "bg-cas-green"
                }`}
              />
            </button>

            <button
              onClick={onMoveDown}
              disabled={isLast}
              className="text-blue-500 hover:text-blue-700"
            >
              <FontAwesomeIcon
                icon={faArrowDown}
                size="sm"
                className={`h-4 w-4 text-cas-white rounded-full p-[0.35rem] hover:shadow-md hover:opacity-90 ${
                  isLast ? "bg-cas-gray-light" : "bg-cas-green"
                }`}
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SectionRow;
