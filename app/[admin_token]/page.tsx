import { CustomButton } from "../components/CustomButton";

export default function Page() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="bg-cas-gray-light p-20 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow">
        <h1>Login de Administrador</h1>
        <div className="flex flex-col w-full my-10">
          <small>Correo Electrónico</small>
          <small>Contraseña</small>
        </div>
        <CustomButton>Ingresar</CustomButton>
      </div>
    </main>
  );
}
