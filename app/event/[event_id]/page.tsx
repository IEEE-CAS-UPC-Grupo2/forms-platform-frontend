export default function Page({ params }: { params: { event_id: string } }) {
  return (
    <main>
      <h1>Event Details Page</h1>
      <div>Event id: {params.event_id}</div>
    </main>
  );
}
