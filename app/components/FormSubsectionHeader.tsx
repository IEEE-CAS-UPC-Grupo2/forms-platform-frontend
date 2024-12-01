import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Subsection, UpdateSubsectionHeader } from "../models";
import { updateSubsectionById } from "../api/subsection";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../api/images-api";
import Image from "next/image";
import toast from "react-hot-toast";
import { MESSAGES } from "../admin/constants";

interface FormSubsectionHeaderProps {
  id: string;
  subsection: Subsection | undefined;
}

export const FormSubsectionHeader = ({
  id,
  subsection,
}: FormSubsectionHeaderProps) => {
  const defaultImage =
    "https://via.placeholder.com/1920x300?text=Imagen+por+defecto";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    subsection?.image ?? defaultImage
  );

  const initialValues = {
    title: subsection?.title ?? "",
    description: subsection?.description ?? "",
    image: subsection?.image ?? "",
    state: subsection?.state ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    state: Yup.string().required("El estado es requerido"),
    image: Yup.string().required("La imagen es requerida"),
  });

  const onSubmit = async (values: UpdateSubsectionHeader) => {
    const imageUrl = imageFile ? await uploadImage(imageFile) : values.image;

    if (imageUrl) {
      values.image = imageUrl;
    }

    await updateSubsectionById(id, values);

    if (fileInputRef.current) {
      fileInputRef.current.files = null;
      setImageFile(null);
    }
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const isWebP = file.type === "image/webp";

      if (!isWebP) {
        toast.error(MESSAGES.ERROR.IMAGE_NOT_WEBP);
        return;
      }

      if (fileSizeMB > 30) {
        setImageFile(null);
        errorOnPreviewImage();
      } else {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const errorOnPreviewImage = () => {
    toast.error(MESSAGES.ERROR.IMAGE_NOT_UPLOAD);
    setPreviewUrl(subsection?.image ?? defaultImage);
  };

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="bg-cas-gray-light sm:p-5 flex flex-col justify-center items-center rounded shadow-cas-gray-light drop-shadow w-2/3 sm:w-3/5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full z-10">
            <div className="flex flex-row justify-center items-center flex-wrap w-full">
              <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                <label>Título de la subsección</label>
                <Field
                  type="text"
                  name="title"
                  className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
                <label>Estado</label>
                <Field
                  as="select"
                  name="state"
                  className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                >
                  <option value="">Selecciona un estado</option>
                  <option value="Activado">Activado</option>
                  <option value="Desactivado">Desactivado</option>
                </Field>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col pb-4 px-4 rounded w-full">
              <label>Descripción de la subsección</label>
              <Field
                as="textarea"
                name="description"
                rows="5"
                className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col pb-4 px-4 rounded w-full">
              <label>
                Selecciona una imagen para la cabecera de la subsección (.webp)
              </label>
              <input
                type="file"
                accept="image/webp"
                ref={fileInputRef}
                onChange={onChangeImage}
                className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded w-full"
              />
              <Image
                src={previewUrl || defaultImage}
                alt="Vista previa"
                className="mt-2"
                width={1920}
                height={300}
                onError={errorOnPreviewImage}
              />
            </div>

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
