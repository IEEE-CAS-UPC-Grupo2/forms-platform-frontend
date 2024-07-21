"use client";

import { adminSchema } from "@/validations/adminSchema";
import { CustomButton } from "../components/CustomButton";
import { Formik, Form } from "formik";
import { FormEntry } from "../components/FormEntry";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../Interceptors/axiosConfig"; // Importa Axios configurado
import { setCookieValue } from "../utils/cookies/setCookie"; // Asegúrate de importar correctamente

export default function Page() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`admin/panel/`);
  };

  const handleLogin = async (values: any) => {
    try {
      const response = await api.post("/Security/Autenticar", {
        email: values.email,
        clave: values.password,
      });

      const data = response.data;

      setCookieValue("idUser", data.idUsuarioAdm);
      setCookieValue("jwt", data.token);
      setCookieValue("refreshToken", data.refreshToken);

      handleCardClick();

      console.log("Authentication response:", data);
    } catch (error) {
      console.error("Error authenticating user:", error);
      setErrorMessage("Ocurrió un error. Por favor, inténtelo de nuevo.");
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
