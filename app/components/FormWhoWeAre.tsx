import { Subsection, UpdateSubsectionContent } from "../models";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { updateSubsectionById } from "../api/subsection";

interface FormSubsectionContentProps {
  id: string;
  subsection: Subsection | undefined;
}

interface AboutIEEE {
  title: string;
  description: string;
  image: string;
}

interface MissionVision {
  title: string;
  description: string;
}

interface WhoWeAreContent {
  aboutIeee: AboutIEEE[];
  missionVision: MissionVision[];
}

export const FormWhoWeAre = ({ id, subsection }: FormSubsectionContentProps) => {
  const whoWeAreContent: WhoWeAreContent = subsection?.content as WhoWeAreContent;
  const initialValues = {
    content: whoWeAreContent,
  };

  const validationSchema = Yup.object({
    content: Yup.object({
      aboutIeee: Yup.array().of(
        Yup.object({
          title: Yup.string().required("El título es requerido"),
          description: Yup.string().required("La descripción es requerida"),
          image: Yup.string().url("Debe ser una URL válida").optional(),
        })
      ),
      missionVision: Yup.array().of(
        Yup.object({
          title: Yup.string().required("El título es requerido"),
          description: Yup.string().required("La descripción es requerida"),
        })
      ),
    }),
  });

  const onSubmit = async (values: UpdateSubsectionContent) => {
    await updateSubsectionById(id, values);
  };

  return (
    <div className="bg-cas-gray-light sm:p-5 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow w-2/3 sm:w-3/5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full z-10">
            <section>
              <h2 className="text-xl text-center mb-2">Acerca de IEEE</h2>
              <div className="flex flex-row justify-center items-center flex-wrap w-full">
                <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                  <label>Primer fragmento</label>
                  <Field
                    type="text"
                    name="content.aboutIeee[0].title"
                    className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                  />
                  <ErrorMessage
                    name="content.aboutIeee[0].title"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    as="textarea"
                    name="content.aboutIeee[0].description"
                    rows="10"
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage
                    name="content.aboutIeee[0].description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                  <label>Segundo fragmento</label>
                  <Field
                    type="text"
                    name="content.aboutIeee[1].title"
                    className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                  />
                  <ErrorMessage
                    name="content.aboutIeee[1].title"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    as="textarea"
                    name="content.aboutIeee[1].description"
                    rows="10"
                    className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                  />
                  <ErrorMessage
                    name="content.aboutIeee[1].description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl text-center mb-4 mt-4">Misión y Visión</h2>
              <div className="flex flex-col pb-4 px-4 rounded w-full">
                <label>Descripción de la misión</label>
                <Field
                  as="textarea"
                  name="content.missionVision[0].description"
                  rows="5"
                  className="bg-cas-white p-2 mt-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                />
                <ErrorMessage
                  name="content.missionVision[0].description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col pb-4 px-4 rounded w-full">
                <label>Descripción de la visión</label>
                <Field
                  as="textarea"
                  name="content.missionVision[1].description"
                  rows="5"
                  className="bg-cas-white p-2 mt-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                />
                <ErrorMessage
                  name="content.missionVision[1].description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </section>

            <div className="flex justify-end mr-4">
              <button
                className="bg-cas-green py-3 px-4 min-w-32 text-[14px] rounded-lg text-cas-white hover:shadow-md hover:opacity-90"
                type="submit"
              >
                Editar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
