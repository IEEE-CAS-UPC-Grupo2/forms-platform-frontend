"use client";

import { adminSchema } from "@/validations/adminSchema";
import { CustomButton } from "../components/CustomButton";
import { Formik, Form } from "formik";
import { FormEntry } from "../components/FormEntry";
import { useState } from "react";
import { useRouter } from "next/navigation";
import environment from '../environments/environments.prod'; // Importa el archivo de configuración

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`admin/panel/`);
  };
  const handleLogin = async (values: any) => {
    try {
      const response = await fetch(
        environment.apiBaseUrl+"/Security/Autenticar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            clave: values.password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      handleCardClick();
      const data = await response.json();
      document.cookie = `jwt=${data.token}; path=/;`;

      console.log("Authentication response:", data);

      // TODO: Redirect to admin dashboard
    } catch (error) {
      console.error("Error authenticating user:", error);
      setErrorMessage("Ocurrio un error. Porfavor intentelo denuevo.");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="bg-cas-gray-light p-10 sm:p-20 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow">
        <h1 className="text-center">Login de Administrador</h1>
        <div className="flex flex-col w-full mt-10">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleLogin}
            validationSchema={adminSchema}
          >
            <Form>
              <FormEntry
                title={"Correo Electrónico"}
                name={"email"}
                type="email"
              />
              <FormEntry
                title={"Contraseña"}
                name={"password"}
                type="password"
              />
              {errorMessage && (
                <div className="text-red-500 text-center mt-2">
                  {errorMessage}
                </div>
              )}
              <div className="mt-4 flex justify-center">
                <CustomButton type="submit">Ingresar</CustomButton>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}
