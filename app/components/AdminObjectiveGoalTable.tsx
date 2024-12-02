import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Item {
  description: string;
}

interface ObjectiveGoalTableProps {
  items: Item[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  modalType: string;
}

export const AdminObjectiveGoalTable = ({
  items,
  onEdit,
  onDelete,
  modalType,
}: ObjectiveGoalTableProps) => {
  return (
    <div className="overflow-y-auto border border-cas-gray-light rounded-b-lg">
      <div className="flex bg-gray-100 font-semibold border-b border-cas-gray-light">
        <div className="w-3/4 px-6 py-3">Descripción</div>
        <div className="w-1/4 px-6 py-3 text-right">Opciones</div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex border-b border-cas-gray-light">
          <div className="w-3/4 px-6 py-3">{item.description}</div>
          <div className="w-1/4 px-7 flex justify-end items-center">
            <button
              onClick={() => onEdit(index)}
              className="text-blue-500 hover:text-blue-700"
              title={`Editar ${modalType}`}
            >
              <FontAwesomeIcon
                icon={faPencil}
                size="lg"
                className="h-4 w-4 text-cas-white bg-cas-green rounded-full p-[0.35rem] hover:shadow-md hover:opacity-90"
              />
            </button>
            <button
              onClick={() => onDelete(index)}
              className="text-red-500 hover:text-red-700 ml-4"
              title={`Eliminar ${modalType}`}
            >
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                className="h-4 w-4 text-cas-white bg-cas-green rounded-full p-[0.35rem] hover:shadow-md hover:opacity-90"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
