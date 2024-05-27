import { institutions } from "@/data/institutions";
import * as Yup from "yup";

export const eventRegistrationSchema = Yup.object({
  name: Yup.string().required("No se ha ingresado un nombre."),
  dni: Yup.string()
    .required("No se ha ingresado un DNI.")
    .length(8, "Debe ser 8 carácteres."),
  institution: Yup.string()
    .required("Porfavor seleccione una opción.")
    .oneOf(institutions, "Seleccione una opción válida."),
  email: Yup.string()
    .email("Correo electrónico inválido.")
    .required("No se ha ingresado un correo electrónico.")
    .min(8, "Debe ser de más de 8 carácteres."),
  ieeeMembershipCode: Yup.string().length(8, "Debe ser 8 carácteres."),
  career: Yup.string()
    .required("No se ha ingresado una carrera.")
    .min(8, "Debe ser de más de 8 carácteres."),
});
