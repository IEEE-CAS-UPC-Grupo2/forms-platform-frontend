"use client";

import { CustomButton } from "@/app/components/CustomButton";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Page({
  params,
}: {
  params: { admin_token: string; event_id: string };
}) {

  const router = useRouter(); 
  //falta un get a partir del id del evento para obtener los datos.
  const event = {
    "id": "5cf87d4a-2cb4-4a13-a95d-67a132b7d7a1",
    "ID_Event": 1,
    "ID_Administrator": 101,
    "EventTitle": "Seminario de Networking Technology IEEE CAS",
    "EventDescription": "A conference discussing the latest trends in technology.",
    "ImageUrl": "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Modality": "In-Person",
    "InstitutionInCharge": "Tech Corp",
    "Vacancy": 150,
    "Address": "123 Tech Street, Tech City",
    "Speaker": "John Doe",
    "EventDateAndTime": "2024-06-15 09:00",
    "EventDuration": 180
  };

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
            EventTitle: event.EventTitle,
            EventDuration: event.EventDuration,
            Modality: event.Modality,
            EventDateAndTime: event.EventDateAndTime,
            Address: event.Address,
            InstitutionInCharge: event.InstitutionInCharge,
            ImageUrl: event.ImageUrl,
            EventDescription: event.EventDescription,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              // logica del envio, conección con backend
              router.push(`/admin/panel`);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="w-full">
                <div className="flex flex-col sm:flex-row justify-center items-center w-full mb-4 space-y-4 sm:space-y-0 sm:space-x-20">
                  <div className="flex flex-col bg-white p-2 rounded w-full">
                    <label>Nombre del evento</label>
                    <Field type="text" name="EventTitle" placeholder={values.EventTitle}
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <label>Duración del evento (minutos)</label>
                    <Field type="number" name="EventDuration" placeholder={values.EventDuration}
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <label>Modalidad</label>
                    <Field type="text" name="Modality" placeholder={values.Modality}
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                  </div>

                  <div className="flex flex-col bg-white p-2 rounded w-full m-4">
                    <label>Fecha y Hora de inicio</label>
                    <Field type="datetime-local" name="EventDateAndTime" placeholder={values.EventDateAndTime}
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <ErrorMessage name="EventDateAndTime" component="div" className="text-red-500 text-sm" />
                    
                    <label>Dirección del evento</label>
                    <Field type="text" name="Address" placeholder={values.Address}
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <ErrorMessage name="Address" component="div" className="text-red-500 text-sm" />
                    
                    <label>Facultad de Lugar</label>
                    <Field type="text" name="InstitutionInCharge" placeholder={values.InstitutionInCharge}
                      className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded"
                    />
                    <ErrorMessage name="InstitutionInCharge" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="flex flex-col p-4 rounded mt-4 w-full">
                  <label>URL de imagen del evento</label>
                  <Field type="text" name="ImageUrl" placeholder={values.ImageUrl}
                    className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage name="ImageUrl" component="div" className="text-red-500 text-sm" />
                  
                  <label>Descripción del evento</label>
                  <Field type="text" name="EventDescription" placeholder={values.EventDescription}
                    className="bg-cas-white p-2 m-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage name="EventDescription" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex justify-center mt-6">
                  <CustomButton type="submit" disabled={isSubmitting}>
                    Guardar Cambios
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
