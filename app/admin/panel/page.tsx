"use client";
import { useEffect, useState } from "react";
import environment from "../../environments/environments.prod"; // Importa el archivo de configuración
import { AdminEventTable } from "@/app/components/AdminEventTable";
import { Event } from "@/app/models/event";
import { getPlatformEvents } from "@/app/api/platform-event";

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await getPlatformEvents();
        if (data && Array.isArray(data)) {
          const uniqueEvents = Array.from(
            new Set(data.map((event: Event) => event.idEvent))
          ).map((id) => data.find((event: Event) => event.idEvent === id)).filter((event) => event !== undefined) as Event[];
          setEvents(uniqueEvents);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const sortedEvents = events.sort(
    (a, b) =>
      new Date(a.eventDateAndTime).getTime() -
      new Date(b.eventDateAndTime).getTime()
  );

  return (
    <main className="flex flex-col pt-20 sm:pt-28 items-center min-h-screen mx-4">
      <h1 className="mb-4 text-center">Panel de Administrador</h1>

      <div className="w-full max-w-6xl mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <AdminEventTable eventos={sortedEvents} />
        )}
      </div>
    </main>
  );
}
