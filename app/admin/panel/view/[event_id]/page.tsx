"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Event } from "../../../../models/event";
import dayjs from 'dayjs';
import environment from './../../../../environments/environments.prod';
import { getCookieValue } from '../../../../utils/cookies/getCookie';
import withAuth from "../../../../withAuth";
import api from '../../../../Interceptors/axiosConfig';
import Image from 'next/image'; // Importa el componente Image de next/image

function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  const fetchEvent = useCallback(async () => { // Use useCallback to memoize fetchEvent
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
  }, [params.event_id]); // Add params.event_id as a dependency

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]); // Include fetchEvent in the dependency array

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
                <Image src="/clock-icon.png" alt="Clock icon" width={44} height={44} /> {/* Reemplazo de <img> por <Image> */}
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
                <Image src="/calendar-icon.png" alt="Calendar icon" width={44} height={44} /> {/* Reemplazo de <img> por <Image> */}
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
              router.push(`/admin/panel`);
            }}
          >
            Regresar
          </CustomButton>
        </div>
      </div>
    </main>
  );
}

// Definición del display name para facilitar la depuración
Page.displayName = 'EventPage';

export default withAuth(Page);
