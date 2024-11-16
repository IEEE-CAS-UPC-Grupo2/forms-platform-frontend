"use client";

import { useState } from "react";
import { CustomButton } from "../components/CustomButton";
import EventRow from "./EventRow";
import { useRouter } from "next/navigation";
import { Event } from "../models/event";
import environment from '../environments/environments.prod'; // Importa el archivo de configuración
import api from '../Interceptors/axiosConfig'; // Importa tu instancia de Axios configurada
import { ADMIN_ROUTES } from "../admin/routes";

interface TablaProps {
  eventos: Event[];
}

export function AdminEventTable({ eventos }: TablaProps) {
  const [eventList, setEventList] = useState<Event[]>(eventos);
  const router = useRouter();

  const handleAddEvent = () => {
    // lógica para agregar un nuevo evento
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.delete(`/PlatformEvent/Delete/${id}`);
      
      if (response.status !== 200) {
        throw new Error('Error al eliminar el evento');
      }

      // Filtrar el evento eliminado de la lista de eventos
      setEventList(prevEventList => prevEventList.filter(evento => evento.idEvent !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`${ADMIN_ROUTES.PANEL.EVENTS}/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`${ADMIN_ROUTES.PANEL.EVENTS}/view/${id}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
        <h2 className="text-lg font-semibold px-4">Detalles de los Eventos</h2>
        <div className="py-2 px-4">
          <CustomButton onClick={() => { router.push(`${ADMIN_ROUTES.PANEL.EVENTS}/create`); }}>
            <span>Crear nuevo evento</span>
          </CustomButton>
        </div>
      </div>

      <div className="h-[32rem] overflow-y-auto border-b border-x border-cas-gray-light rounded-b-lg">
        <div className="flex p-2 border-b border-cas-gray-light font-semibold">
          <div className="flex-initial w-5/12 flex px-6 py-1">
            Nombre del Evento
          </div>
          <div className="flex-1 flex px-6 py-1">Fecha y Hora</div>
          <div className="flex-1 flex justify-end px-6 py-1">Opciones</div>
        </div>

        {eventList.map((evento) => (
          <EventRow 
            key={evento.idEvent} 
            event={evento} 
            onDelete={handleDelete}
            onEdit={handleEdit}
            onView={handleView} 
          />
        ))}
      </div>
    </div>
  );
}
