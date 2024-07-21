"use client";

import { useEffect, useState } from "react";
import { Event } from "../../../models/event";
import { CustomButton } from "@/app/components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";
import { Form, Formik } from "formik";
import { assistanceSchema } from "@/validations/assistanceSchema";
import { FormEntry } from "@/app/components/FormEntry";
import { getPlatformEventById } from "@/app/api/platform-event";
import { updateAttendance } from "@/app/api/participation";
import { Attendance } from "@/app/models/attendance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { event_id: string } }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [event, setEvent] = useState<Event>();
  const router = useRouter();

  const getEvent = async () => {
    try {
      const data = await getPlatformEventById(Number(params.event_id));
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event: ", error);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (!event) {
    return (
      <svg
        className="animate-spin text-cas-green w-20 h-20 mx-auto text-center mt-40"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="mx-auto text-center max-w-[200px] sm:max-w-[400px] px-4 mt-12">
        Asistencia del Evento
      </h1>
      <div className="mt-4 flex flex-col justify-center items-center pb-28">
        <div className="mx-4 sm:mx-10 bg-cas-gray-light px-4 py-10 lg:px-32 sm:py-12 flex flex-col rounded shadow-cas-gray-light drop-shadow my-10 items-center text-center">
          <h1 className="mb-4 min-w-[16rem] sm:max-w-[36rem] px-4">
            {event.eventTitle}
          </h1>
          <div className="flex flex-row mt-2 mb-8">
            <FontAwesomeIcon
              className="mr-4"
              icon={faPersonChalkboard}
              size="xl"
            />
            <h2>{event.speaker}</h2>
          </div>
          <Formik
            initialValues={{
              email: "",
              dni: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              const newAttendance: Attendance = {
                idEvent: Number(params.event_id),
                dni: values.dni,
                email: values.email,
              };
              try {
                const response = await updateAttendance(newAttendance);
                console.log("Attendance marked successfully:", response);
                resetForm();
                toast.success("La asistencia fue marcada exitosamente.", {
                  onClose: () => {
                    router.push(`/`);
                  },
                });
              } catch (error) {
                console.error("Error marking attendance: ", error);
                toast.error(
                  "Hubo un error al marcar su participación. Intentelo de nuevo.",
                );
              }
            }}
            validationSchema={assistanceSchema}
          >
            <Form className="min-w-[16rem] sm:min-w-[24rem] text-start">
              <FormEntry
                title={"Correo Electrónico"}
                name={"email"}
                type="email"
              />
              <FormEntry title={"DNI"} name={"dni"} />
              {errorMessage && (
                <div className="text-red-500 text-center mt-2">
                  {errorMessage}
                </div>
              )}
              <div className="mt-4 flex justify-center">
                <CustomButton type="submit">Marcar asistencia</CustomButton>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
