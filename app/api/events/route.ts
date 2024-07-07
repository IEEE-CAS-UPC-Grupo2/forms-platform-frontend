import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3005/events", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get events data.");
  }

  const data = await res.json();

  return NextResponse.json({ data });
}
