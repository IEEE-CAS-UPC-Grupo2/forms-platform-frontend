export default function Page({ params }: { params: { event_id: string } }) {
  return (
    <main>
      <h1>Mark Assistance Page</h1>
      <div>Event id: {params.event_id}</div>
    </main>
  );
}
