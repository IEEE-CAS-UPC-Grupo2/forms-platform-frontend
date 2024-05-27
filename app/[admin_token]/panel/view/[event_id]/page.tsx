"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";

export default function Page({
        params,
    }: {
        params: { admin_token: string; event_id: string };
    }
) {

    const router = useRouter();

    //falta un get a partir del id del evento para obtner los datos.

    const event = {
      "id": "5cf87d4a-2cb4-4a13-a95d-67a132b7d7a1",
      "ID_Event": 1,
      "ID_Administrator": 101,
      "EventTitle": "Seminario de Networking Technology IEEE CAS",
      "EventDescription": "A conference discussing the latest trends in technology.",
      "ImageUrl": "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "Modality": "In-Person",
      "InstitutionInCharge": "Tech Corp",
      "Vacancy": 150,
      "Address": "123 Tech Street, Tech City",
      "Speaker": "John Doe",
      "EventDateAndTime": "2024-06-15 09:00",
      "EventDuration": 180
    };

    return (
        <main style={{ overflowY: 'hidden' }}>

            <div className="my-32">

                <div className="flex flex-col justify-center items-center my-8">
                    <h1>Visualización de evento</h1>
                </div>
            
                <div className="bg-cas-gray-light 
                sm:p-5 flex flex-col justify-center 
                items-center rounded shadow-cas-gray-light 
                drop-shadow mx-24 mb-20" style={{ overflow: 'hidden' }} >

                    <div className="flex flex-col sm:flex-row justify-center items-center w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-20">

                        <div className="flex flex-col bg-white p-2 rounded w-full">
                            <label>Nombre del evento</label>
                            <div className="bg-cas-white p-2 m-2 rounded">{event.EventTitle}</div>
                            <label>Duración del evento</label>
                            <div className="bg-cas-white p-2 m-2 rounded">{event.EventDuration}</div>
                            <label>Modalidad</label>
                            <div className="bg-cas-white p-2 m-2 rounded">{event.Modality}</div>
                        </div>

                    <div className="flex flex-col bg-white p-2 rounded w-full m-4">
                        <label>Fecha y Hora de inicio</label>
                        <div className="bg-cas-white p-2 m-2 rounded">{event.EventDateAndTime}</div>
                        <label>Dirección del evento</label>
                        <div className="bg-cas-white p-2 m-2 rounded">{event.Address}</div>
                        <label>Facultad de Lugar</label>
                        <div className="bg-cas-white p-2 m-2 rounded">{event.InstitutionInCharge}</div>
                        </div>

                    </div>

                    <div className="flex flex-col p-4 rounded mt-4 w-full">
                        <label>URL de imagen del evento</label>
                        <div className="bg-cas-white p-2 m-2 rounded break-all" >{event.ImageUrl}</div>
                        <label>Descripción del evento</label>
                        <div className="bg-cas-white p-2 m-2 rounded break-all" >{event.EventDescription}</div>
                    </div>

                    <CustomButton onClick={() => {
                        router.push(`/[admin_token]/panel`);
                    }}>
                        Regresar
                    </CustomButton>

                </div>
            </div>
            
        </main>
    );
 }
