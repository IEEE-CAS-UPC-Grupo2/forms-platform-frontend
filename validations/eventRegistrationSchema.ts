import { studyCenters } from "@/data/studyCenters";
import * as Yup from "yup";

const studyCenterValues = studyCenters
  .map((center) => center.value)
  .filter((value) => value !== "");

export const eventRegistrationSchema = Yup.object({
  name: Yup.string().required("No se ha ingresado un nombre."),
  dni: Yup.string()
    .required("No se ha ingresado un DNI.")
    .length(8, "Debe ser 8 carácteres."),
  studyCenter: Yup.string()
    .required("Porfavor seleccione una opción.")
    .oneOf(studyCenterValues, "Seleccione una opción válida."),
  email: Yup.string()
    .email("Correo electrónico inválido.")
    .required("No se ha ingresado un correo electrónico.")
    .min(8, "Debe ser de más de 8 carácteres."),
  ieeeMembershipCode: Yup.string().length(8, "Debe ser 8 carácteres."),
  career: Yup.string()
    .required("No se ha ingresado una carrera.")
    .min(8, "Debe ser de más de 8 carácteres."),
});
