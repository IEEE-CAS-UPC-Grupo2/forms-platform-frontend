"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { faClock, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  const router = useRouter();

  //falta un get a partir del id del evento para obtner los datos.

  const event = {
    id: "5cf87d4a-2cb4-4a13-a95d-67a132b7d7a1",
    ID_Event: 1,
    ID_Administrator: 101,
    EventTitle: "Seminario de Networking Technology IEEE CAS",
    EventDescription:
      "A conference discussing the latest trends in technology.",
    ImageUrl:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Modality: "In-Person",
    InstitutionInCharge: "Tech Corp",
    Vacancy: 150,
    Address: "123 Tech Street, Tech City",
    Speaker: "John Doe",
    EventDateAndTime: "2024-06-15 09:00",
    EventDuration: 180,
  };

  return (
    <main className="overflow-auto pt-4 pb-20 z-10">

      <div className="mt-16 flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">Visualización de evento</h1>
        </div>

        <div className="bg-cas-gray-light 
                sm:p-5 flex flex-col justify-center 
                items-center rounded shadow-cas-gray-light 
                drop-shadow w-2/3 sm:w-3/5"
        >

          <div className="flex flex-row justify-center items-center flex-wrap w-full z-10">
            
            <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[250px] lg:w-1/2 w-full">
              <label>Nombre del evento</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded
               h-15 overflow-x-auto whitespace-nowrap" title={event.EventTitle}>
                <span>{event.EventTitle}</span>
              </div>
              <label>Duración del evento</label>
              <div className="flex flex-row justify-center items-center">
                <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded-l rounded-r-none
               h-15 overflow-x-auto whitespace-nowrap w-full">
                  {event.EventDuration}
                </div>
                <img src="/clock-icon.png" alt="Clock icon" className=" h-11 w-11"/>
              </div>           
              <label>Modalidad</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded
               h-15 overflow-x-auto whitespace-nowrap">
                {event.Modality}
              </div>
              <label>Ponentes</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded
               h-15 overflow-x-auto whitespace-nowrap">
                {event.Speaker}
              </div>
            </div>

            <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[250px] lg:w-1/2 w-full">
              <label>Fecha y Hora de inicio</label>
              <div className="flex flex-row justify-center items-center">
                <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded-l rounded-r-none
               h-15 overflow-x-auto whitespace-nowrap w-full">
                  {event.EventDateAndTime}
                </div>
                <img src="/calendar-icon.png" alt="Clock icon" className=" h-11 w-11"/>
              </div>
              
              <label>Instituciones a cargo</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded
               h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.InstitutionInCharge}
              </div>
              <label>Lugar</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded
               h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.Address}
              </div>
              <label>Vacantes disponibles</label>
              <div className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded
               h-15 overflow-x-auto whitespace-nowrap w-full">
                {event.Vacancy}
              </div>
            </div>

          </div>

          <div className="flex flex-col pb-4 px-4 rounded w-full">
            <label>URL de imagen del evento</label>
            <div className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded 
            overflow-x-auto whitespace-nowrap">
              {event.ImageUrl}
            </div>
            <label>Descripción del evento</label>
            <div className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded break-all">
              {event.EventDescription}
            </div>
          </div>

          <CustomButton
            color="black"
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
