"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Page() {

  const router = useRouter(); 

  const validationSchema = Yup.object({
    EventTitle: Yup.string().required("Required"),
    EventDuration: Yup.number().required("Required").positive("Must be positive").integer("Must be an integer"),
    Modality: Yup.string().required("Required"),
    EventDateAndTime: Yup.date().required("Required"),
    Address: Yup.string().required("Required"),
    InstitutionInCharge: Yup.string().required("Required"),
    ImageUrl: Yup.string().url("Must be a valid URL").required("Required"),
    EventDescription: Yup.string().required("Required"),
  });

  return (
    <main className="mt-20" >

      <div className="my-32">
        <div className="flex flex-col justify-center items-center my-8">
          <h1>Edición de evento</h1>
        </div>

        <div className="bg-cas-gray-light 
        sm:p-5 flex flex-col justify-center 
        items-center rounded shadow-cas-gray-light 
        drop-shadow mx-24 mb-20" style={{ overflow: 'hidden' }} >

          <Formik initialValues={{
            EventTitle: "",
            EventDuration: "",
            Modality: "",
            EventDateAndTime: "",
            Address: "",
            InstitutionInCharge: "",
            ImageUrl:"",
            EventDescription: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              // logica del envio, conexión con backend
              router.push(`/admin/panel`);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="w-full">
                <div className="flex flex-col sm:flex-row justify-center items-center w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-20">
                  <div className="flex flex-col bg-white p-2 rounded w-full">
                    <label>Nombre del evento</label>
                    <Field type="text" name="EventTitle"
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <label>Duración del evento (minutos)</label>
                    <Field type="number" name="EventDuration" 
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <label>Modalidad</label>
                    <Field type="text" name="Modality" 
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                  </div>

                  <div className="flex flex-col bg-white p-2 rounded w-full m-4">
                    <label>Fecha y Hora de inicio</label>
                    <Field type="datetime-local" name="EventDateAndTime"
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <ErrorMessage name="EventDateAndTime" component="div" className="text-red-500 text-sm" />
                    
                    <label>Dirección del evento</label>
                    <Field type="text" name="Address" 
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <ErrorMessage name="Address" component="div" className="text-red-500 text-sm" />
                    
                    <label>Facultad de Lugar</label>
                    <Field type="text" name="InstitutionInCharge" 
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <ErrorMessage name="InstitutionInCharge" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="flex flex-col p-4 rounded mt-4 w-full">
                  <label>URL de imagen del evento</label>
                  <Field type="text" name="ImageUrl" 
                    className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage name="ImageUrl" component="div" className="text-red-500 text-sm" />
                  
                  <label>Descripción del evento</label>
                  <Field type="text" name="EventDescription" 
                    className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage name="EventDescription" component="div" className="text-red-500 text-sm" />
                  
                </div>

                <div className="flex justify-center mt-6">

                  <CustomButton onClick={() => { router.push(`/admin/panel`);}}>
                    Regresar
                  </CustomButton>
                  <div className="p-2 mx-8"></div>
                  <CustomButton type="submit" disabled={isSubmitting}>
                    Registrar
                  </CustomButton>
                </div>
              </Form>
            )}
          </Formik>

        </div>
      </div>

    </main>
  );
}
