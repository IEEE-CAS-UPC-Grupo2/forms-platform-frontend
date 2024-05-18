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

  const today = new Date();

  const sortedEvents = events
    .filter((event) => new Date(event.EventDateAndTime) >= today)
    .sort(
      (a, b) =>
        new Date(a.EventDateAndTime).getTime() -
        new Date(b.EventDateAndTime).getTime(),
    );

  return (
    <main className="flex min-h-screen flex-col pt-20">
      <div className="bg-cas-green flex flex-col justify-center text-center w-full text-cas-white p-12 shadow-cas-gray shadow-sm">
        <h1 className="mb-4">Próximos Eventos</h1>
        <p>
          Descubre eventos próximos: conferencias, talleres y más. ¡Asegura tu
          lugar hoy mismo!
        </p>
      </div>
      <div className="p-4 sm:py-10 sm:px-10 md:px-20 xl:px-32 4xl:px-48">
        <div className="hidden md:grid md:place-content-center pb-8">
          SearchBar
        </div>
        {sortedEvents.length > 0 ? (
          <div className="grid place-content-center justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-8">
            {sortedEvents.map((event, index) => (
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
