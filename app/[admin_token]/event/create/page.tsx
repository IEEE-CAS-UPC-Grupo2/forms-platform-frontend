export default function Page({ params }: { params: { admin_token: string } }) {
  return (
    <main>
      <h1>Admin Event Creation Page</h1>
      <div>Admin Token: {params.admin_token}</div>
    </main>
  );
}
