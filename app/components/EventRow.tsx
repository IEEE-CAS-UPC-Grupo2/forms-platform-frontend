import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faEye, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { formatEventDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";
import { Event } from "../models/event";
import environment from "../environments/environments.prod";

interface EventProps {
  event: Event;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
}

const EventRow: React.FC<EventProps> = ({ event, onDelete, onEdit, onView }) => {
  const handleDelete = () => {
    onDelete(event.idEvent);
  };

  const handleEdit = () => {
    onEdit(event.idEvent);
  };

  const handleViewClick = () => {
    onView(event.idEvent);
  };

  return (
    <div className="flex py-1 px-8 border-b border-cas-gray-light">
      <div className="flex-initial w-5/12 flex items-center">{event.eventTitle}</div>
      <div className="flex-1 flex px-4 items-center">{formatEventDate(event.eventDateAndTime)}</div>
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
            icon={faTrashAlt}
            size="lg"
            className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
          />
        </button>
      </div>
    </div>
  );
};

export default EventRow;
