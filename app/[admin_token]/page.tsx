"use client";

import { adminSchema } from "@/validations/adminSchema";
import { CustomButton } from "../components/CustomButton";
import { Formik, Field, Form, ErrorMessage } from "formik";

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
              <div className="flex flex-col">
                <small>Correo Electrónico</small>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-1 border-cas-gray-mid border-[0.5px] rounded text-sm"
                />
                <ErrorMessage
                  className="text-xs mt-1"
                  name="email"
                  component="div"
                />
              </div>
              <div className="flex flex-col mt-4">
                <small>Contraseña</small>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-1 border-cas-gray-mid border-[0.5px] rounded"
                />
                <ErrorMessage
                  className="text-xs mt-1"
                  name="password"
                  component="div"
                />
              </div>
              <div className="mt-10 flex justify-center">
                <CustomButton type="submit">Ingresar</CustomButton>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
}
