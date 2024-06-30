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
    "EventDuration": "02:30"
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
    <main className="overflow-auto pt-4 pb-28" >

      <div className="mt-16 flex flex-col justify-center items-center">

        <div className="flex flex-col justify-center items-center my-8">
          <h1 className="text-center">Edición de evento</h1>
        </div>

        <div className="bg-cas-gray-light 
                sm:p-5 flex flex-col justify-center 
                items-center rounded shadow-cas-gray-light 
                drop-shadow w-2/3 sm:w-3/5"
        >

          <Formik initialValues={{
            EventTitle: event.EventTitle,
            EventDuration: event.EventDuration,
            Modality: event.Modality,
            EventDateAndTime: event.EventDateAndTime,
            Address: event.Address,
            InstitutionInCharge: event.InstitutionInCharge,
            ImageUrl: event.ImageUrl,
            EventDescription: event.EventDescription,
            Vacancy: event.Vacancy,
            Speaker: event.Speaker
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              // logica del envio, conección con backend
              router.push(`/admin/panel`);
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="w-full z-10">
                <div className="flex flex-row justify-center items-center flex-wrap w-full">
                  <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">

                    <label>Nombre del evento</label>
                    <Field type="text" name="EventTitle" placeholder={values.EventTitle}
                    className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="EventTitle" component="div" className="text-red-500 text-sm"/>
                    
                    <label>Duración del evento (hh:mm)</label>
                    <div className="flex items-center">
                      <Field type="text" name="EventDuration" placeholder="hh:mm" pattern="^([0-9]{1,2}):([0-5][0-9])$" 
                      className="bg-cas-white p-2 my-2 w-full border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                      title="Formato requerido: hh:mm"
                      />
                      {/*<img src="/clock-icon.png" alt="Clock icon"  className="h-11 w-11"/> */}
                    </div> 
                    <ErrorMessage name="EventDuration" component="div" className="text-red-500 text-sm"/>

                    <label>Modalidad</label>
                    <Field as="select" name="Modality" 
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap">
                      <option value="virtual">Virtual</option>
                      <option value="presencial">Presencial</option>
                    </Field>
                    <ErrorMessage name="Modality" component="div" className="text-red-500 text-sm"/>

                    <label>Ponentes (separar c/u con commas “,” )</label>
                    <Field type="text" name="Speaker" placeholder={event.Speaker}
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="Speaker" component="div" className="text-red-500 text-sm"/>
                  </div>

                  <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">

                    <label>Fecha y Hora de inicio</label>
                    <Field type="datetime-local" name="EventDateAndTime" placeholder={values.EventDateAndTime}
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="EventDateAndTime" component="div" className="text-red-500 text-sm"/>
                    
                    <label>Instituciones a cargo (separar c/u con commas “,” )</label>
                    <Field type="text" name="InstitutionInCharge" placeholder={values.Address}
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="InstitutionInCharge" component="div" className="text-red-500 text-sm" />
                    
                    <label>Facultad de Lugar</label>
                    <Field type="text" name="Address" placeholder={values.InstitutionInCharge}
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                    />
                    <ErrorMessage name="Address" component="div" className="text-red-500 text-sm" />

                    <label>Vacantes disponibles</label>
                    <Field type="number" name="Vacancy" placeholder={event.Vacancy}
                      className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap" 
                    />
                    <ErrorMessage name="Vacancy" component="div" className="text-red-500 text-sm"/>
                  </div>
                </div>

                <div className="flex flex-col pb-4 px-4 rounded w-full">
                  <label>URL de imagen del evento</label>
                  <Field type="text" name="ImageUrl" placeholder={values.ImageUrl}
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded overflow-x-auto whitespace-nowrap"
                  />
                  <ErrorMessage name="ImageUrl" component="div" className="text-red-500 text-sm" />
                  
                  <label>Descripción del evento</label>
                  <Field as="textarea" name="EventDescription" placeholder={values.EventDescription} rows="5"
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage name="EventDescription" component="div" className="text-red-500 text-sm" />
                </div>

                <div className="flex flex-row justify-center items-center w-full">

                  <button className="bg-cas-black text-cas-white py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                  onClick={() => { router.push(`/admin/panel`);}}>
                    Cancelar
                  </button>

                  <div className="min-w-8"></div>
                  <button className="bg-cas-green py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                  type="submit" disabled={isSubmitting}>
                    Modificar
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
