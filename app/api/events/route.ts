import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Hacer la solicitud a la API externa
    const res = await fetch("http://localhost:5022/api/EventsCa/List", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta no es exitosa
    if (!res.ok) {
      throw new Error("Failed to get events data.");
    }

    // Convertir la respuesta a JSON
    const data = await res.json();

    // Devolver la respuesta JSON
    return NextResponse.json({ data });
  } catch (error) {
    // Manejar cualquier error que ocurra durante la solicitud
    console.error('Error fetching events data:', error);

    let errorMessage = 'An unexpected error occurred.';

    // Si el error es una instancia de Error, extraer el mensaje
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
