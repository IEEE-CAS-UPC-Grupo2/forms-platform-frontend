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


  return (
    <main className="flex flex-col justify-center items-center min-h-screen ">
      
      <h1 className="mb-4">Admin Panel Page</h1>

      <div className="w-full max-w-6xl">
        <AdminEventTable eventos={events} />
      </div>

    </main>
  );
}
