"use client";

import { useRouter } from "next/navigation"; // Importa desde next/navigation en lugar de next/router
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Event } from "../../../../models/event";
import { useState, useEffect } from "react";
import environment from './../../../../environments/environments.prod'; // Importa el archivo de configuración
import { getCookieValue } from '../../../../utils/cookies/getCookie';
import {uploadImage} from "@/app/api/images-api"; // Asegúrate de importar correctamente
import api from '../../../../Interceptors/axiosConfig'; // Importa tu instancia de Axios configurada
import { ADMIN_ROUTES } from "@/app/admin/constants";

export default function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [inputValue, setInputValue] = useState(''); // Cadena vacía como valor inicial
  const [initialDate, setInitialDate] = useState('');

  const validationSchema = Yup.object({
    EventTitle: Yup.string().required(function(value) {
      return value ? undefined : "Required";
    }),
    EventDuration: Yup.number()
      .required(function(value) {
        return value ? undefined : "Required";
      })
      .positive("Must be positive")
      .integer("Must be an integer"),
    Modality: Yup.string().required(function(value) {
      return value ? undefined : "Required";
    }),
    EventDateAndTime: Yup.date().required(function(value) {
      return value ? undefined : "Required";
    }),
    Address: Yup.string().required(function(value) {
      return value ? undefined : "Required";
    }),
    InstitutionInCharge: Yup.string().required(function(value) {
      return value ? undefined : "Required";
    }),
    ImageUrl: Yup.string().url("Must be a valid URL"),
    EventDescription: Yup.string().required(function(value) {
      return value ? undefined : "Required";
    }),
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/PlatformEvent/${params.event_id}`);

        if (response.status === 200) {
          setEvent(response.data.value); // Actualiza el estado con los datos del evento obtenidos
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [params.event_id]);

  useEffect(() => {
    if (event && event.eventDateAndTime) {
      try {
        // Verifica que eventDateAndTime no esté vacío
        if (typeof event.eventDateAndTime === 'string' && event.eventDateAndTime.trim()) {
          // Extraer fecha y hora de eventDateAndTime
          const [datePart, timePart] = event.eventDateAndTime.split(' ');

          // Verifica que datePart y timePart tengan el formato esperado
          if (datePart && timePart) {
            const [year, month, day] = datePart.split('/');
            const [hour, minute] = timePart.split(':');

            // Verifica que se obtuvieron todos los valores necesarios
            if (year && month && day && hour && minute) {
              // Formatear al formato YYYY-MM-DDTHH:MM
              const formattedDate = `${year}-${month}-${day}T${hour}:${minute}`;
              setInitialDate(formattedDate);
            } else {
              console.error("Error parsing eventDateAndTime: Incomplete date or time parts");
            }
          } else {
          }
        } else {
          console.warn("eventDateAndTime is an empty string");
        }
      } catch (error) {
        // Manejar el error, tal vez establecer una fecha predeterminada o dejar en blanco
      }
    } else {
      console.warn("event or eventDateAndTime is undefined or null");
      // Puedes manejar el caso cuando event o eventDateAndTime no estén disponibles
    }
  }, [event]);



  const updateEvent = async (values: any) => {
    try {
          const jwtCookie = getCookieValue('jwt');
          const jwtidUser = getCookieValue('idUser');

          const imageUrl = imageFile ? await uploadImage(imageFile) : "";

      const updatedEvent = {
        idEvent: params.event_id,
        eventTitle: values.EventTitle,
        eventDescription: values.EventDescription,
        imageUrl: imageUrl,
        modality: values.Modality,
        institutionInCharge: values.InstitutionInCharge,
        vacancy: values.Vacancy,
        address: values.Address,
        speaker: values.Speaker,
        eventDateAndTime: values.EventDateAndTime,
        eventDuration: values.EventDuration,
        idAdministrator:jwtidUser
      };

      const response = await fetch(
        
        environment.apiBaseUrl+`/PlatformEvent/Edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      //router.push(`/admin/panel`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <main className="overflow-auto pt-4 pb-28">
      <div className="mt-16 flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">Edición de evento</h1>
        </div>

        <div className="bg-cas-gray-light sm:p-5 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow w-2/3 sm:w-3/5">
          <Formik
          enableReinitialize
            initialValues={{
              idEvent:event?.idEvent || "",
              EventTitle: event?.eventTitle || "",
              EventDuration: event?.eventDuration || "",
              Modality: event?.modality || "",
              EventDateAndTime: event?.eventDateAndTime || "",
              Address: event?.address || "",
              InstitutionInCharge: event?.institutionInCharge || "",
              ImageUrl: event?.imageUrl || "",
              EventDescription: event?.eventDescription || "",
              Vacancy: event?.vacancy || "",
              Speaker: event?.speaker || "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              updateEvent(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full z-10">
                <div className="flex flex-row justify-center items-center flex-wrap w-full">
                  <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                    <label>Nombre del evento</label>
                    <Field
                      type="text"
                      name="EventTitle"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage
                      name="EventTitle"
                      component="div"
                      
                      className="text-red-500 text-sm"
                    />

                    <label>Duración del evento (hh:mm)</label>
                    <div className="flex items-center">
                      <Field
                        type="text"
                        name="EventDuration"
                        className="bg-cas-white p-2 my-2 w-full border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                        title="Formato requerido: hh:mm"
                      />
                    </div>
                    <ErrorMessage
                      name="EventDuration"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <label>Modalidad</label>
                    <Field
                      as="select"
                      name="Modality"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    >
                      <option value="virtual">Virtual</option>
                      <option value="presencial">Presencial</option>
                    </Field>
                    <ErrorMessage
                      name="Modality"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <label>Ponentes (separar c/u con commas “,” )</label>
                    <Field
                      type="text"
                      name="Speaker"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage
                      name="Speaker"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                    <label>Fecha y Hora de inicio</label>
                    <Field
                      type="datetime-local"
                      name="EventDateAndTime"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage
                      name="EventDateAndTime"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <label>
                      Instituciones a cargo (separar c/u con commas “,” )
                    </label>
                    <Field
                      type="text"
                      name="InstitutionInCharge"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage
                      name="InstitutionInCharge"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <label>Facultad de Lugar</label>
                    <Field
                      type="text"
                      name="Address"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage
                      name="Address"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <label>Vacantes disponibles</label>
                    <Field
                      type="number"
                      name="Vacancy"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage
                      name="Vacancy"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col pb-4 px-4 rounded w-full">
                  <label>Selecciona una imagen para el evento</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      if (file) {
                        const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
                        if (fileSizeMB > 30) {
                          setImageFile(null); // Clear the file
                        } else {
                          setImageFile(file);
                        }
                      }
                    }}
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded w-full"
                  />


                  <label>Descripción del evento</label>
                  <Field
                      as="textarea"
                      name="EventDescription"
                      rows="5"
                      className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage
                      name="EventDescription"
                      component="div"
                      className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-row justify-center items-center w-full">
                  <button
                      className="bg-cas-black py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                      onClick={() => {
                        router.push(ADMIN_ROUTES.PANEL.EVENTS);
                      }}
                  >
                    Cancelar
                  </button>

                  <div className="min-w-8"></div>
                  <button
                      className="bg-cas-green py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                      type="submit"

                  >
                    Modificar
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
}
