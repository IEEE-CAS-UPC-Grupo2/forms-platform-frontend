"use client";
import { useEffect, useState } from "react";
import { Event } from "@/app/api/events/data";
import environment from '../../environments/environments.prod'; // Importa el archivo de configuración
import { AdminEventTable } from "@/app/components/AdminEventTable";
import { getCookieValue } from '../../utils/cookies/getCookie'; // Asegúrate de importar correctamente

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const jwtCookie = getCookieValue('jwt');

        const response = await fetch(environment.apiBaseUrl + `/EventsCa/List`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwtCookie}`,
            "Content-Type": "application/json"
          },
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
        if (data.status && Array.isArray(data.value)) {
          // Filtra eventos únicos por idEvent
          const uniqueEvents = Array.from(new Set(data.value.map((event: Event) => event.idEvent)))
            .map(id => data.value.find((event: Event) => event.idEvent === id));
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
      new Date(b.eventDateAndTime).getTime(),
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
