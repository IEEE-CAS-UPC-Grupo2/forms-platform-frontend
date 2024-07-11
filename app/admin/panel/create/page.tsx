"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import environment from './../../../environments/environments.prod'; // Importa el archivo de configuración

export default function Page() {

  const router = useRouter(); 

  const validationSchema = Yup.object({
    EventTitle: Yup.string().required("Required"),
    EventDuration: Yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
    Modality: Yup.string().required("Required"),
    EventDateTime: Yup.date().required("Required"),
    AddressEvent: Yup.string().required("Required"),
    InstitutionInCharge: Yup.string().required("Required"),
    ImageUrl: Yup.string().url("Must be a valid URL").required("Required"),
    EventDescription: Yup.string().required("Required"),
    Vacancy: Yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
    Speaker: Yup.string().required("Required"),
  });

  return (
    <main className="overflow-auto pt-4 pb-28" >

      <div className="mt-16 flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">Creación de nuevo evento</h1>
        </div>

        <div className="bg-cas-gray-light 
                sm:p-5 flex flex-col justify-center 
                items-center rounded shadow-cas-gray-light 
                drop-shadow w-2/3 sm:w-3/5" >

          <Formik initialValues={{
            EventTitle: "",
            EventDuration: "",
            Modality: "",
            EventDateTime: "",
            AddressEvent: "",
            InstitutionInCharge: "",
            ImageUrl:"",
            EventDescription: "",
            Vacancy: "",
            Speaker: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const jwtCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");

                const response = await fetch(environment.apiBaseUrl+"/EventsCa/Save", {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${jwtCookie}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(values),
                });

                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Event created:", data);
                router.push(`/admin/panel`);
              } catch (error) {
                console.error("Error creating event:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="w-full z-10">
                <div className="flex flex-row justify-center items-center flex-wrap w-full">
                  <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">

                    <label>Nombre del evento</label>
                    <Field type="text" name="EventTitle"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="EventTitle" component="div" className="text-red-500 text-sm"/>

                    <label>Duración del evento</label>
                    <Field type="text" name="EventDuration" placeholder="hh:mm"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="EventDuration" component="div" className="text-red-500 text-sm"/>

                    <label>Modalidad</label>
                    <Field as="select" name="Modality" 
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap">
                      <option value="virtual">Virtual</option>
                      <option value="presencial">Presencial</option>
                    </Field>
                    <ErrorMessage name="Modality" component="div" className="text-red-500 text-sm"/>
                    
                    <label>Ponentes (separar c/u con comas “,” )</label>
                    <Field type="text" name="Speaker" 
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="Speaker" component="div" className="text-red-500 text-sm"/>

                  </div>

                  <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                    <label>Fecha y Hora de inicio</label>
                    <Field type="datetime-local" name="EventDateTime"
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="EventDateTime" component="div" className="text-red-500 text-sm" />
                    
                    <label>Instituciones a cargo (separar c/u con comas “,” )</label>
                    <Field type="text" name="InstitutionInCharge" 
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="InstitutionInCharge" component="div" className="text-red-500 text-sm" />
                    
                    <label>Lugar</label>
                    <Field type="text" name="AddressEvent" 
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="Address" component="div" className="text-red-500 text-sm" />

                    <label>Vacantes disponibles</label>
                    <Field type="number" name="Vacancy" 
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="Vacancy" component="div" className="text-red-500 text-sm"/>
                  </div>
                </div>

                <div className="flex flex-col pb-4 px-4 rounded w-full">
                  <label>URL de imagen del evento</label>
                  <Field type="text" name="ImageUrl" 
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded overflow-x-auto whitespace-nowrap"
                  />
                  <ErrorMessage name="ImageUrl" component="div" className="text-red-500 text-sm" />
                  
                  <label>Descripción del evento</label>
                  <Field as="textarea" name="EventDescription" rows="5"
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage name="EventDescription" component="div" className="text-red-500 text-sm" />
                  
                </div>

                <div className="flex justify-center mt-6">

                  <button className="bg-cas-black text-cas-white py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                  onClick={() => { router.push(`/admin/panel`);}}>
                    Cancelar
                  </button>

                  <div className="p-2 mx-8"></div>
                  <button className="bg-cas-green py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                  type="submit" disabled={isSubmitting}>
                    Registrar
                  </button>

                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>

    </main>
  );
}
