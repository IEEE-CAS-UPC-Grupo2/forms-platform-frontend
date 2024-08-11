import * as Yup from "yup";

export const adminSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido.")
    .required("No se ha ingresado un correo electrónico.")
    .min(8, "Debe ser de más de 8 carácteres."),
  password: Yup.string()
    .required("No se ha ingresado una constraseña.")
    .min(8, "Debe ser mínimo 8 carácteres."),
});
