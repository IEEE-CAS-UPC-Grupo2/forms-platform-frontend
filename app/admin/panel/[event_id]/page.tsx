"use client";

import { useRouter } from "next/navigation"; // Importa desde next/navigation en lugar de next/router
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Event } from "../../../api/events/data";
import { useState, useEffect } from "react";
import environment from './../../../environments/environments.prod'; // Importa el archivo de configuración
import { getCookieValue } from '../../../utils/cookies/getCookie'; // Asegúrate de importar correctamente

export default function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  const validationSchema = Yup.object({
    EventTitle: Yup.string().required("Required"),
    EventDuration: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    Modality: Yup.string().required("Required"),
    EventDateAndTime: Yup.date().required("Required"),
    Address: Yup.string().required("Required"),
    InstitutionInCharge: Yup.string().required("Required"),
    ImageUrl: Yup.string().url("Must be a valid URL").required("Required"),
    EventDescription: Yup.string().required("Required"),
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {

        const jwtCookie = getCookieValue('jwt');

        const response = await fetch(
          environment.apiBaseUrl+`/EventsCa/${params.event_id}`,
          {
            headers: {
              Authorization: `Bearer ${jwtCookie}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Response data:", data); // Registro de los datos recibidos

        if (data) {
          setEvent(data.value); // Actualiza el estado con los datos del evento obtenidos
        } else {
          throw new Error("No data received");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [params.event_id]);

  const updateEvent = async (values: any) => {
    try {
          const jwtCookie = getCookieValue('jwt');

      const updatedEvent = {
        idEvent: params.event_id,
        eventTitle: values.EventTitle,
        eventDescription: values.EventDescription,
        imageUrl: values.ImageUrl,
        modality: values.Modality,
        institutionInCharge: values.InstitutionInCharge,
        vacancy: values.Vacancy,
        address: values.Address,
        speaker: values.Speaker,
        eventDateAndTime: values.EventDateAndTime,
        eventDuration: values.EventDuration,
      };

      const response = await fetch(
        
        environment.apiBaseUrl+`/EventsCa/Edit`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwtCookie}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );
      console.log("entra2");

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
              console.log(values);
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
                      placeholder={event?.eventTitle}
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
                        placeholder={event?.eventDuration}
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
                      placeholder={event?.speaker}
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
                      placeholder={event?.eventDateAndTime}
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
                      placeholder={event?.institutionInCharge}
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
                      placeholder={event?.address}
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
                      placeholder={event?.vacancy}
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
                  <label>URL de imagen del evento</label>
                  <Field
                    type="text"
                    name="ImageUrl"
                    placeholder={event?.imageUrl}
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded overflow-x-auto whitespace-nowrap"
                  />
                  <ErrorMessage
                    name="ImageUrl"
                    component="div"
                    className="text-red-500 text-sm"
                  />

                  <label>Descripción del evento</label>
                  <Field
                    as="textarea"
                    name="EventDescription"
                    placeholder={event?.eventDescription}
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
                    className="bg-cas-black text-cas-white py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                    onClick={() => {
                      router.push(`/admin/panel`);
                    }}
                  >
                    Cancelar
                  </button>

                  <div className="min-w-8"></div>
                  <button
                    className="bg-cas-green py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                    type="submit"
                    disabled={isSubmitting}
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
