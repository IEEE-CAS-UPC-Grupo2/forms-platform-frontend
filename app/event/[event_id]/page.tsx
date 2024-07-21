"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonChalkboard,
  faLocationDot,
  faCity,
  faPassport,
  faPeopleGroup,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

import { Event } from "../../models/event";
import { useEffect, useState } from "react";
import { formatEventDate } from "./../../utils/formatDate";
import { CustomButton } from "@/app/components/CustomButton";
import { RegisterForm } from "@/app/components/RegisterForm";
import { getPlatformEventById } from "@/app/api/platform-event";

export default function Page({ params }: { params: { event_id: string } }) {
  const [event, setEvent] = useState<Event>();

  const getEvent = async () => {
    try {
      const data = await getPlatformEventById(Number(params.event_id));
      console.log(data);
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event: ", error);
    }
  };

  const scrollToSection = () => {
    const registrationSection = document.getElementById("registration");
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: "smooth" });
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

  const formatModality = (modality: string, address: string) => {
    if (modality == "InPerson") {
      return "Presencial - " + address;
    }
    return "Online";
  };

  return (
    <main className="flex min-h-screen flex-col pt-24">
      <div className="px-4 sm:px-24 md:px-32 xl:px-48 2xl:px-64 4xl:px-64">
        <div className="bg-cas-black w-full rounded-2xl">
          <Image
            src={event.imageUrl}
            alt={event.eventTitle}
            width={360}
            height={200}
            className="h-auto lg:h-[400px] xl:h-[440px] 2xl:h-[480px] w-full rounded-2xl md:rounded-none md:w-3/5 mx-auto"
          />
        </div>
        <div className="flex flex-row mt-12">
          <div className="lg:w-9/12 pr-4">
            <h2>{formatEventDate(event.eventDateAndTime).toLowerCase()}</h2>
            <h1>{event.eventTitle}</h1>
            <div className="flex flex-row items-center mt-4">
              <FontAwesomeIcon
                className="mr-4"
                icon={faPersonChalkboard}
                size="xl"
              />
              <h2>{event.speaker}</h2>
            </div>
            <p className="mt-6">{event.eventDescription}</p>
            <h2 className="mt-6">Fecha y Hora</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon
                className="mr-4"
                icon={faLocationDot}
                size="xl"
              />
              <p>{formatEventDate(event.eventDateAndTime).toLowerCase()}</p>
            </div>
            <h2 className="mt-6">Institución a cargo</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon className="mr-4" icon={faCity} size="xl" />
              <p>{event.institutionInCharge}</p>
            </div>
            <h2 className="mt-6">Modalidad</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon className="mr-4" icon={faPassport} size="xl" />
              <p>{formatModality(event.modality, event.address)}</p>
            </div>
            <h2 className="mt-6">Vacantes</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon
                className="mr-4"
                icon={faPeopleGroup}
                size="xl"
              />
              <p>{event.vacancy} personas</p>
            </div>
          </div>
          <div className="hidden lg:block w-3/12 text-right">
            <CustomButton onClick={scrollToSection}>
              <FontAwesomeIcon className="pr-2" icon={faArrowDown} size="lg" />
              Registrate al evento
            </CustomButton>
          </div>
        </div>
        <section id="registration">
          <RegisterForm idEvent={Number(params.event_id)} />
        </section>
      </div>
    </main>
  );
}
