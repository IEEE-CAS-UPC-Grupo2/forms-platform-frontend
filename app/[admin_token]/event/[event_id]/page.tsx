export default function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {
  return (
    <main className="mt-20">
      <h1>Admin Event Modification Page</h1>
      <div>Admin Token: {params.admin_token}</div>
      <div>Event Id: {params.event_id}</div>
    </main>
  );
}
