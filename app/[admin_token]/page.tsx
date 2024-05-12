import { CustomButton } from "../components/CustomButton";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1>Admin Login Page</h1>
      <button className="bg-cas-white font-semibold">hello</button>
      <CustomButton color="red" text={"Ingresar"} />
    </main>
  );
}
