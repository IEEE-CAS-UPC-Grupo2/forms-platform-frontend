import { Formik, Form } from "formik";
import { eventRegistrationSchema } from "@/validations/eventRegistrationSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomButton } from "./CustomButton";
import { FormEntry } from "./FormEntry";
import { institutions } from "@/data/institutions";

export const RegisterForm = () => {
  return (
    <div className="bg-cas-gray-light rounded-2xl py-4 md:py-8 px-4 md:px-10 my-16 lg:mb-36 mx-auto w-[95%]">
      <div className="flex flex-row items-center mt-2 mb-6">
        <FontAwesomeIcon className="mr-4" icon={faPenToSquare} size="xl" />
        <h2>Registro al evento</h2>
      </div>
      <Formik
        initialValues={{
          name: "",
          dni: "",
          institution: "",
          email: "",
          ieeeMembershipCode: "",
          career: "",
        }}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
        validationSchema={eventRegistrationSchema}
      >
        <Form>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="lg:pr-6">
              <FormEntry title="Nombre" name="name" />
              <FormEntry title="DNI" name="dni" />
              <FormEntry
                title="Elige tu Centro de Estudios"
                name="institution"
                as="select"
                options={institutions}
              />
            </div>
            <div className="lg:pl-6">
              <FormEntry title="Correo Electrónico" name="email" type="email" />
              <FormEntry
                title="Código de Membersia IEEE (Opcional)"
                name="ieeeMembershipCode"
              />
              <FormEntry title="Carrera" name="career" />
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <CustomButton type="submit">Registrarse</CustomButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
