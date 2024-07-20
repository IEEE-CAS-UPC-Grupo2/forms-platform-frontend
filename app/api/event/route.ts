import environment from "@/app/environments/environments.prod";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { event_id: string } }) {
  const { event_id } = params;

  const res = await fetch(environment.apiBaseUrl + `/EventsCa/${event_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log("This my data: ", data);

  return NextResponse.json({ data });
}
