export default function Page({ params }: { params: { admin_token: string } }) {
  return (
    <main className="mt-20">
      <h1>Admin Event Creation Page</h1>
      <div>Admin Token: {params.admin_token}</div>
    </main>
  );
}
