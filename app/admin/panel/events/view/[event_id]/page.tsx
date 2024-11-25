"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Event } from "../../../../../models/event";
import dayjs from 'dayjs';
import { getCookieValue } from '../../../../../utils/cookies/getCookie'; // Asegúrate de importar correctamente
import withAuth from "../../../../../withAuth";
import api from '../../../../../Interceptors/axiosConfig'; // Importa tu instancia de Axios configurada
import { ADMIN_ROUTES } from "@/app/admin/constants";

function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const jwtCookie = getCookieValue('jwt');
        const response = await api.get(`/PlatformEvent/${params.event_id}`, {
          headers: {
            "Authorization": `Bearer ${jwtCookie}`,
            "Content-Type": "application/json"
          },
        });

        if (response.status === 200) {
          setEvent(response.data.value);
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [params.event_id]);

  const formatEventDateTime = (dateTime: string): string => {
    const date = dayjs(dateTime);
    return date.format('YYYY/MM/DD HH:mm:ss');
  };

  if (!event) {
    return null;
  }

  return (
    <main className="overflow-auto pt-4 pb-20 z-10">
      <div className="mt-16 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">Visualización de evento</h1>
        </div>
        <div className="bg-cas-gray-light sm:p-5 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow w-2/3 sm:w-3/5">
          <div className="flex flex-row justify-center items-center flex-wrap w-full z-10">
            <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
              <label>Nombre del evento</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap" title={event.eventTitle}>
                <span>{event.eventTitle}</span>
              </div>
              <label>Duración del evento</label>
              <div className="flex flex-row justify-center items-center">
                <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded-l rounded-r-none h-15 overflow-x-auto whitespace-nowrap w-full">
                  {event.eventDuration} horas
                </div>
                <img src="/clock-icon.png" alt="Clock icon" className=" h-11 w-11"/>
              </div>  
              <label>Modalidad</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap">
                {event.modality}
              </div>
              <label>Ponentes</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap">
                {event.speaker}
              </div>
            </div>
            <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
              <label>Fecha y Hora de inicio</label>
              <div className="flex flex-row justify-center items-center">
                <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded-l rounded-r-none h-15 overflow-x-auto whitespace-nowrap w-full">
                  {formatEventDateTime(event.eventDateAndTime)}
                </div>
                <img src="/calendar-icon.png" alt="Clock icon" className=" h-11 w-11"/>
              </div>
              <label>Instituciones a cargo</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.institutionInCharge}
              </div>
              <label>Lugar</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.address}
              </div>
              <label>Vacantes disponibles</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.vacancy}
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-4 px-4 rounded w-full">
            <label>URL de imagen del evento</label>
            <div className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded overflow-x-auto whitespace-nowrap">
              {event.imageUrl}
            </div>
            <label>Descripción del evento</label>
            <div className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all">
              {event.eventDescription}
            </div>
          </div>
          <CustomButton color="black"
            onClick={() => {
              router.push(ADMIN_ROUTES.PANEL.EVENTS);
            }}
          >
            Regresar
          </CustomButton>
        </div>
      </div>
    </main>
  );
}

export default withAuth(Page);
