"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Event } from "./../../../../api/events/data";
import { format } from 'date-fns';
import environment from './../../../../environments/environments.prod'; // Importa el archivo de configuración

export default function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const jwtCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await fetch(environment.apiBaseUrl+`/EventsCa/${params.event_id}`, {
          headers: {
            "Authorization": `Bearer ${jwtCookie}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Response data:", data);

        if (data) {
          setEvent(data.value);
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [params.event_id]);

  const formatEventDateTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return format(date, 'yyyy/MM/dd HH:mm:ss');
  };

  if (!event) {
    return <p>Loading...</p>;
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
                  {formatEventDateTime(event.eventDateTime)}
                </div>
                <img src="/calendar-icon.png" alt="Clock icon" className=" h-11 w-11"/>
              </div>
              <label>Instituciones a cargo</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.institutionInCharge}
              </div>
              <label>Lugar</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.addressEvent}
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
