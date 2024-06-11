"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatEventDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";

interface EventRowProps {
  EventTitle: string;
  EventDateAndTime: string;
  id: string;
}

export const EventRow: React.FC<EventRowProps> = ({
  EventTitle,
  EventDateAndTime,
  id,
}) => {
  const router = useRouter();

  const handleEdit = () => {
    //redirigir al usuario a la página de edición
    router.push(`/admin/panel/${id}`);
  };

  const handleViewClick = () => {
    //visualizar evento
    router.push(`/admin/panel/view/${id}`);
  };

  const handleDelete = () => {
    //lógica para eliminar el evento
  };

  return (
    <div className="flex py-1 px-8 border-b border-cas-gray-light">
      <div className="flex-initial w-5/12 flex items-center">{EventTitle}</div>
      <div className="flex-1 flex px-4 items-center">
        {formatEventDate(EventDateAndTime)}
      </div>
      <div className="flex-1 flex justify-end items-center space-x-4">
        <button onClick={handleEdit}>
          <FontAwesomeIcon
            icon={faPencil}
            size="lg"
            className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
          />
        </button>
        <button onClick={handleViewClick}>
          <FontAwesomeIcon
            icon={faEye}
            size="lg"
            className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
          />
        </button>
        <button onClick={handleDelete}>
          <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
          />
        </button>
      </div>
    </div>
  );
};
