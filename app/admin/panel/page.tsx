"use client";

import { useEffect, useState } from "react";
import { AdminEventTable } from "@/app/components/AdminEventTable";
import { Event } from "@/app/models/event";
import { getPlatformEvents } from "@/app/api/platform-event";
import withAuth from "../../withAuth";

function Page() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getPlatformEvents();
        if (Array.isArray(data)) {
          const uniqueEvents = Array.from(
            new Map(data.map(event => [event.idEvent, event])).values()
          );
          setEvents(uniqueEvents);
        } else {
          console.error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return null;  //  return <p>Loanding....</p>
  }

  const sortedEvents = events.slice().sort(
    (a, b) => new Date(a.eventDateAndTime).getTime() - new Date(b.eventDateAndTime).getTime()
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

export default withAuth(Page);
