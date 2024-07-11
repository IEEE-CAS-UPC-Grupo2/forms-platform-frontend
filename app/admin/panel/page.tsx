"use client";
import { useEffect, useState } from "react";
import { Event } from "@/app/api/events/data";

import { AdminEventTable } from "@/app/components/AdminEventTable";
export default function Page() {
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

  const sortedEvents = events.sort(
    (a, b) =>
      new Date(a.eventDateTime).getTime() -
      new Date(b.eventDateTime).getTime(),
  );

  return (
    <main className="flex flex-col pt-20 sm:pt-28 items-center min-h-screen mx-4">
      <h1 className="mb-4 text-center">Panel de Administrador</h1>

      <div className="w-full max-w-6xl mt-4">
        <AdminEventTable eventos={sortedEvents} />
      </div>
    </main>
  );
}
