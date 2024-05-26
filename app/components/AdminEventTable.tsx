"use client";

import { CustomButton } from "../components/CustomButton";
import { useRouter } from "next/navigation";
import { EventRow } from "./EventRow";
import { Event } from "../api/events/data";

interface TablaProps {
    eventos: Event[];
}


export function AdminEventTable({eventos}: TablaProps) {

    const router = useRouter();

    const handleAddEvent = () => {
        //lógica para agregar un nuevo evento
    };
    
    return (
        <div className="p-4 bg-white rounded shadow w-full style={color='green'}">

          <div className="flex justify-between items-center bg-gray-200 p-2 rounded mb-2">
            <h2 className="text-lg font-semibold">Detalles de los Eventos</h2>

            <CustomButton onClick={handleAddEvent} >
              <span>Crear nuevo evento</span>
            </CustomButton>
          </div>

          <div className="flex justify-between items-center p-2 border-b font-bold bg-gray-200">
            <div className="flex-1 flex justify-center items-center">Nombre del Evento</div>
            <div className="flex-1 flex justify-center items-center">Fecha y Hora</div>
            <div className="flex-1 flex justify-center items-center">Opciones</div>
          </div>

          <div className="overflow-auto h-[500px]">
            {eventos.map((evento) => (
              <EventRow key={evento.id} {...evento} />
            ))}
          </div>

        </div>
    );
}