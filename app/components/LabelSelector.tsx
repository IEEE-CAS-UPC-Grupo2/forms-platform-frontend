import { useState, useEffect, useRef } from "react";
import { getLabels, createLabel, deleteLabel } from "../api/label";
import { Label } from "../models";

interface LabelSelectorProps {
  labels: string[];
  onAddLabel: (label: string) => void;
  onRemoveLabel: (label: string) => void;
}

const LabelSelector = ({
  labels,
  onAddLabel,
  onRemoveLabel,
}: LabelSelectorProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableLabels, setAvailableLabels] = useState<Label[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadLabels = async () => {
    const fetchedLabels = await getLabels();
    setAvailableLabels(fetchedLabels);
  };

  useEffect(() => {
    loadLabels();
  }, []);

  const filteredLabels = availableLabels.filter((label) =>
    label.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewLabel = async () => {
    if (!searchTerm || labels.includes(searchTerm)) return;

    const newLabel = await createLabel({ name: searchTerm });

    onAddLabel(newLabel.name);
    await loadLabels();

    setSearchTerm("");
  };

  const handleDeleteLabel = async (label: string) => {
    await deleteLabel(label);
    await loadLabels();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative">
      <label>Etiquetas</label>
      <div
        className="p-2 my-2 border rounded cursor-pointer"
        onClick={() => setShowDropdown(true)}
      >
        {labels.length === 0
          ? "Selecciona o crea una etiqueta..."
          : labels.map((label) => (
              <span
                key={label}
                className="bg-cas-gray text-cas-white px-3 py-1 rounded-full flex items-center gap-2 mr-2 mt-1 mb-1 inline-flex"
              >
                {label}
                <button
                  type="button"
                  className="text-white bg-cas-red-500 rounded-full px-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveLabel(label);
                  }}
                >
                  x
                </button>
              </span>
            ))}
      </div>

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full bg-cas-white border rounded shadow-md max-h-60 overflow-y-auto z-50"
        >
          <input
            type="text"
            placeholder="Buscar etiqueta..."
            className="p-2 border-b border-cas-gray-mid w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredLabels.map((label) => (
            <div
              key={label.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            >
              <div
                className="cursor-pointer w-full"
                onMouseDown={() => {
                  onAddLabel(label.name);
                  setShowDropdown(false);
                }}
              >
                {label.name}
              </div>
              <button
                type="button"
                className="text-red-500 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteLabel(label.id);
                }}
              >
                Eliminar
              </button>
            </div>
          ))}
          {searchTerm && filteredLabels.length === 0 && (
            <div
              className="p-2 text-blue-500 hover:bg-gray-100 cursor-pointer"
              onMouseDown={handleAddNewLabel}
            >
              Crear etiqueta {searchTerm}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LabelSelector;
