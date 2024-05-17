"use client";
import { useEffect, useState } from "react";
import { Event } from "./api/events/data";
import { EventCard } from "./components/EventCard";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data.data);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <main className="flex min-h-screen flex-col pt-20">
      <div className="bg-cas-green flex flex-col justify-center text-center w-full text-cas-white p-12 shadow-cas-gray shadow-sm">
        <h1 className="mb-4">Próximos Eventos</h1>
        <p>
          Descubre eventos próximos: conferencias, talleres y más. ¡Asegura tu
          lugar hoy mismo!
        </p>
      </div>
      <div>SearchBar</div>
      <div className="p-4 sm:py-10 sm:px-12 md:px-20 xl:px-40">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <EventCard
                key={index}
                title={event.EventTitle}
                date={event.EventDateAndTime}
                imageSrc={event.ImageUrl}
              />
            ))}
          </div>
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </main>
  );
}
