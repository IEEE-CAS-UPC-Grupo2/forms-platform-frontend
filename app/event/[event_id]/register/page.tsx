"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareFromSquare,
  faPersonChalkboard,
  faLocationDot,
  faPassport,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Event } from "../../../models/event";
import { formatEventDate } from "@/app/utils/formatDate";
import { getPlatformEventById } from "@/app/api/platform-event";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page({ params }: { params: { event_id: string } }) {
  const [event, setEvent] = useState<Event>();

  const getEvent = async () => {
    try {
      const data = await getPlatformEventById(Number(params.event_id));
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event: ", error);
    }
  };

  const formatModality = (modality: string, address: string) => {
    if (modality == "InPerson") {
      return "Presencial - " + address;
    }
    return "Online";
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

  const handleCopyToClipboard = () => {
    const currentUrl = window.location.href;

    const modifiedUrl = currentUrl.replace("/register", "");

    navigator.clipboard
      .writeText(modifiedUrl)
      .then(() => {
        toast.success("URL copiada al portapapeles!");
      })
      .catch((err) => {
        console.error("Error copying to clipboard:", err);
      });
  };

  return (
    <main className="pt-12 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-lg mx-auto text-center max-w-[400px] px-4 mt-16">
        Se ha registrado al evento exitosamente
      </h1>
      <div className="flex-grow flex flex-col justify-center items-center pb-32">
        <div className="bg-cas-gray-light p-10 sm:px-20 sm:py-12 flex flex-col rounded shadow-cas-gray-light drop-shadow max-w-[85%] lg:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[65%] my-10">
          <h1 className="mb-4 mx-auto">{event.eventTitle}</h1>
          <div className="flex flex-row  mt-4">
            <FontAwesomeIcon
              className="mr-4"
              icon={faPersonChalkboard}
              size="xl"
            />
            <h2>{event.speaker}</h2>
          </div>
          <p className="mt-6">{event.eventDescription}</p>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <h2 className="mt-6">Fecha y Hora</h2>
              <div className="flex flex-row items-center mt-2">
                <FontAwesomeIcon
                  className="mr-4"
                  icon={faLocationDot}
                  size="xl"
                />
                <p>{formatEventDate(event.eventDateAndTime).toLowerCase()}</p>
              </div>
            </div>
            <div>
              <h2 className="mt-6">Modalidad</h2>
              <div className="flex flex-row items-center mt-2">
                <FontAwesomeIcon className="mr-4" icon={faPassport} size="xl" />
                <p>{formatModality(event.modality, event.address)}</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-10">
            <CustomButton onClick={handleCopyToClipboard}>
              <FontAwesomeIcon className="pr-2" icon={faShareFromSquare} />
              Comparte el evento
            </CustomButton>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
