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

import { Event } from "./../../api/events/data";
import { useEffect, useState } from "react";
import { formatEventDate } from "./../../utils/formatDate";
import { CustomButton } from "@/app/components/CustomButton";
import { RegisterForm } from "@/app/components/RegisterForm";

export default function Page({ params }: { params: { event_id: string } }) {
  const [event, setEvent] = useState<Event>();

  const getEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/events/${params.event_id}`,
      );
      const data = await response.json();
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
    // Show a loading state while the event data is being fetched
    return <div className="pt-20">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col pt-24">
      <div className="px-4 sm:px-24 md:px-32 xl:px-48 2xl:px-64 4xl:px-64">
        <div className="bg-cas-black w-full rounded-2xl">
          <Image
            src={event.ImageUrl}
            alt={event.EventTitle}
            width={640}
            height={400}
            className="h-auto lg:h-[400px] xl:h-[440px] 2xl:h-[480px] w-full rounded-2xl md:rounded-none md:w-3/5 mx-auto"
          />
        </div>
        <div className="flex flex-row mt-12">
          <div className="lg:w-9/12 pr-4">
            <h2>{formatEventDate(event.EventDateAndTime).toLowerCase()}</h2>
            <h1>{event.EventTitle}</h1>
            <div className="flex flex-row items-center mt-4">
              <FontAwesomeIcon
                className="mr-4"
                icon={faPersonChalkboard}
                size="xl"
              />
              <h2>{event.Speaker}</h2>
            </div>
            <p className="mt-6">{event.EventDescription}</p>
            <h2 className="mt-6">Fecha y Hora</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon
                className="mr-4"
                icon={faLocationDot}
                size="xl"
              />
              <p>{formatEventDate(event.EventDateAndTime).toLowerCase()}</p>
            </div>
            <h2 className="mt-6">Institución a cargo</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon className="mr-4" icon={faCity} size="xl" />
              <p>{event.InstitutionInCharge}</p>
            </div>
            <h2 className="mt-6">Modalidad</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon className="mr-4" icon={faPassport} size="xl" />
              <p>
                {event.Modality} - {event.Address}
              </p>
            </div>
            <h2 className="mt-6">Vacantes</h2>
            <div className="flex flex-row items-center mt-2">
              <FontAwesomeIcon
                className="mr-4"
                icon={faPeopleGroup}
                size="xl"
              />
              <p>{event.Vacancy} personas</p>
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
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
