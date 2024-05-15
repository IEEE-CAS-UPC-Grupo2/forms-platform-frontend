import { EventCard } from "./components/EventCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <div className="bg-cas-green flex flex-col justify-center text-center w-full text-cas-white p-12 shadow-cas-gray shadow-sm">
        <h1 className="mb-4">Próximos Eventos</h1>
        <p>
          Descubre eventos próximos: conferencias, talleres y más. ¡Asegura tu
          lugar hoy mismo!
        </p>
      </div>
      <div className="p-4 sm:py-10 sm:px-12 md:px-20 xl:px-40">
        <div>SearchBar</div>
        <EventCard />
      </div>
    </main>
  );
}
