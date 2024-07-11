"use client";

import { CustomButton } from "../components/CustomButton";
import EventRow  from "./EventRow";
import { useRouter } from "next/navigation";
import { Event } from "../api/events/data";

interface TablaProps {
  eventos: Event[];
}

export function AdminEventTable({ eventos }: TablaProps) {
  
  const router = useRouter(); 

  const handleAddEvent = () => {
    //lógica para agregar un nuevo evento
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
        <h2 className="text-lg font-semibold px-4">Detalles de los Eventos</h2>
        <div className="py-2 px-4">
          <CustomButton onClick={() => { router.push(`/admin/panel/create`);}}>
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

        {eventos.map((evento) => (
          <EventRow key={evento.id} {...evento} />
        ))}
      </div>
    </div>
  );
}
