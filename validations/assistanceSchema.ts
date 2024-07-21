import * as Yup from "yup";

export const assistanceSchema = Yup.object({
  dni: Yup.string()
    .required("No se ha ingresado un DNI.")
    .length(8, "Debe ser 8 carácteres."),
  email: Yup.string()
    .email("Correo electrónico inválido.")
    .required("No se ha ingresado un correo electrónico.")
    .min(8, "Debe ser de más de 8 carácteres."),
});
