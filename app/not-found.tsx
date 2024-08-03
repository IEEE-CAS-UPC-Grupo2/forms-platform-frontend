"use client";

import { useRouter } from 'next/navigation'
import Image from "next/image";

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center bg-cas-white min-h-screen">
      <Image
        src="/LogoCAS.png" // Reemplaza esto con la ruta a tu imagen
        alt="Logo de la rama CAS IEEE"
        width={220}
        height={220}
        className="mb-10"
      />
      <h1 className="text-center">404 - Página no encontrada</h1>
      <button className="mt-4 px-4 py-2 bg-cas-green text-cas-white rounded" onClick={() => router.push('/')}>Volver al inicio</button>
    </div>
  )
}