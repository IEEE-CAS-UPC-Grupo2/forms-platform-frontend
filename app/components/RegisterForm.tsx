import { Formik, Form } from "formik";
import { eventRegistrationSchema } from "@/validations/eventRegistrationSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { CustomButton } from "./CustomButton";
import { FormEntry } from "./FormEntry";
import { studyCenters } from "@/data/studyCenters";
import { saveParticipation } from "../api/participation";
import { Participation } from "../models/participation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface RegisterFormProps {
  idEvent: number;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ idEvent }) => {
  const router = useRouter();

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
          studyCenter: "",
          email: "",
          ieeeMembershipCode: "",
          career: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const newParticipation: Participation = {
            idEvent,
            dni: values.dni,
            name: values.name,
            email: values.email,
            studyCenter: values.studyCenter,
            career: values.career,
            hasCertificate: false,
            hasAttended: false,
          };

          try {
            await saveParticipation(newParticipation);
            resetForm();
            const currentPath = window.location.pathname;
            router.push(`${currentPath}/register`);
          } catch (error) {
            toast.error(
              "Hubo un error al crear su participación. Intentelo de nuevo.",
            );
            console.error("Error creating participation:", error);
          }
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
                name="studyCenter"
                as="select"
                options={studyCenters}
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
      <ToastContainer />
    </div>
  );
};
