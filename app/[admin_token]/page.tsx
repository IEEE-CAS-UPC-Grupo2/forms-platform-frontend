export default function Page({ params }: { params: { admin_token: string } }) {
  return (
    <main>
      <h1>Admin Panel Page</h1>
      <div>Admin Token: {params.admin_token}</div>
    </main>
  );
}
