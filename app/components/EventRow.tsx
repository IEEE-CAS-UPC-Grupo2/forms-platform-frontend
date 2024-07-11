import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatEventDate } from "../utils/formatDate";
import { useRouter } from "next/navigation";
import environment from '../environments/environments.prod'; // Importa el archivo de configuración

interface Event {
  idEvent: number;
  eventTitle: string;
  eventDateTime: string;
  // Agrega las propiedades que necesites del evento
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/admin/panel/${id}`);
  };

  const handleViewClick = (id: number) => {
    router.push(`/admin/panel/view/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const jwtCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
      const response = await fetch(environment.apiBaseUrl+`/EventsCa/Delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${jwtCookie}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Elimina el evento del estado local si la eliminación es exitosa
      setEvents(events.filter(event => event.idEvent !== id));
      console.log(`Deleted event with ID ${id}`);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const jwtCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
  
        const response = await fetch(environment.apiBaseUrl+"/EventsCa/List", {
          headers: {
            "Authorization": `Bearer ${jwtCookie}`,
            "Content-Type": "application/json"
          },
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        if (data.status && Array.isArray(data.value)) {
          console.log("Data received:", data);
          setEvents(data.value); // Actualiza con todos los eventos obtenidos
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []); // Deja las dependencias vacías para ejecutar solo una vez al montar el componente
  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        events.map((event) => (
          <div key={event.idEvent} className="flex py-1 px-8 border-b border-cas-gray-light">
            <div className="flex-initial w-5/12 flex items-center">{event.eventTitle}</div>
            <div className="flex-1 flex px-4 items-center">
              {formatEventDate(event.eventDateTime)}
            </div>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <button onClick={() => handleEdit(event.idEvent)}>
                <FontAwesomeIcon
                  icon={faPencil}
                  size="lg"
                  className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
                />
              </button>
              <button onClick={() => handleViewClick(event.idEvent)}>
                <FontAwesomeIcon
                  icon={faEye}
                  size="lg"
                  className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
                />
              </button>
              <button onClick={() => handleDelete(event.idEvent)}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  size="lg"
                  className="h-5 w-5 text-cas-white bg-cas-green rounded-full p-[0.45rem] hover:shadow-md hover:opacity-90"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default EventList;
