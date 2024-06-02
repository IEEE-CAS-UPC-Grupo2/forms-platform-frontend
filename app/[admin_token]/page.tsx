"use client";

import { adminSchema } from "@/validations/adminSchema";
import { CustomButton } from "../components/CustomButton";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FormEntry } from "../components/FormEntry";

export default function Page() {
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
            onSubmit={(values) => {
              // Handle form submission
              console.log(values);
            }}
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
