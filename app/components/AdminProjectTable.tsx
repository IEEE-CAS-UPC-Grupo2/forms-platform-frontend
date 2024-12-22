import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../models";
import { toggleFeatured } from "../api/project";

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

export const AdminProjectTable = ({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured
}: ProjectTableProps) => {
  return (
    <div className="overflow-y-auto border border-cas-gray-light rounded-b-lg">
      <div className="flex bg-gray-100 font-semibold border-b border-cas-gray-light">
        <div className="w-1/6 px-6 py-3">Fecha de publicación</div>
        <div className="w-3/6 px-6 py-3">Titulo</div>
        <div className="w-1/6 px-6 py-3">Estado</div>
        <div className="w-1/6 px-6 py-3 text-right">Opciones</div>
      </div>
      {projects.map((item, index) => (
        <div key={index} className="flex border-b border-cas-gray-light">
          <div className="w-1/6 px-6 py-3">
            {new Date(item.publishDate).toLocaleString()}
          </div>
          <div className="w-3/6 px-6 py-3">{item.title}</div>
          <div className="w-1/6 px-6 py-3">{item.state}</div>
          <div className="w-1/6 px-7 flex justify-end items-center space-x-4">
            <button
              onClick={() => onToggleFeatured(item.id)}
              className={`flex items-center justify-center h-8 w-8 rounded-full hover:shadow-md hover:opacity-90 bg-cas-green`}
              title={`Destacar`}
            >
              <FontAwesomeIcon
                icon={faStar}
                className={`ml-[0.5px] text-lg ${
                  item.isFeatured ? "text-cas-yellow" : "text-cas-white"
                }`}
              />
            </button>
            <button
              onClick={() => onEdit(item)}
              className="text-cas-blue-500 hover:text-cas-blue-700 flex items-center justify-center h-8 w-8 bg-cas-green rounded-full hover:shadow-md hover:opacity-90"
              title={`Editar`}
            >
              <FontAwesomeIcon icon={faPencil} className="text-cas-white" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="text-cas-red-500 hover:text-red-700 flex items-center justify-center h-8 w-8 bg-cas-green rounded-full hover:shadow-md hover:opacity-90"
              title={`Eliminar`}
            >
              <FontAwesomeIcon icon={faTrash} className="text-cas-white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
