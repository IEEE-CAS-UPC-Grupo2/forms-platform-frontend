import { NextResponse } from "next/server";

interface Params {
  event_id: string;
}

export async function GET({ params }: { params: { event_id: string } }) {
  const { event_id } = params;

  const res = await fetch(`http://localhost:3005/events/${event_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("This my data: ", data);

  return NextResponse.json({ data });
}
