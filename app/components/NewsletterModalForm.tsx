import { CreateNewsletter, Newsletter, UpdateNewsletter } from "../models";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "../api/images-api";
import Image from "next/image";
import toast from "react-hot-toast";
import { MESSAGES } from "../admin/constants";
import { createNewsletter, updateNewsletter } from "../api/newsletter";
import { formatFromApiDate } from "../utils/formatDate";
import LabelSelector from "./LabelSelector";

interface NewsletterModalFormProps {
  newsletter: Newsletter | null;
  onClose: () => void;
}

export const NewsletterModalForm = ({
  newsletter,
  onClose,
}: NewsletterModalFormProps) => {
  const defaultImage =
    "https://via.placeholder.com/1920x300?text=Imagen+por+defecto";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(
    newsletter?.image ?? defaultImage
  );

  const [labels, setLabels] = useState<string[]>(newsletter?.labels ?? []);

  const initialValues = {
    title: newsletter?.title ?? "",
    description: newsletter?.description ?? "",
    image: newsletter?.image ?? defaultImage,
    state: newsletter?.state ?? "",
    labels: newsletter?.labels ?? [],
    publishDate: formatFromApiDate(newsletter?.publishDate) ?? "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("El título es requerido"),
    description: Yup.string().required("La descripción es requerida"),
    image: Yup.string().required("La imagen es requerida"),
    state: Yup.string().required("El estado es requerido"),
    labels: Yup.array().of(Yup.string().required("La etiqueta es requerida")),
    publishDate: Yup.string().required("La fecha de publicación es requerida"),
  });

  const handleAddLabel = (label: string) => {
    if (labels.includes(label)) {
      toast.error("La etiqueta ya fue añadida");
      return;
    }
    
    setLabels((prev) => [...prev, label]);
  };

  const handleRemoveLabel = (label: string) => {
    setLabels((prev) => prev.filter((l) => l !== label));
  };

  const handlePublishDateChange =
    (setFieldValue: (field: string, value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue("publishDate", e.target.value);
    };

  const onSubmit = async (data: CreateNewsletter | UpdateNewsletter) => {
    if (data.image === defaultImage && !imageFile) {
      toast.error(MESSAGES.ERROR.IMAGE_NOT_UPLOAD);
      return;
    }

    const imageUrl = imageFile ? await uploadImage(imageFile) : data.image;

    if (imageUrl) {
      data.image = imageUrl;
    }

    if (newsletter && newsletter.id) {
      await updateNewsletter(newsletter.id, { ...data, labels });
    } else {
      await createNewsletter({
        ...data,
        labels,
        isFeatured: false,
      } as CreateNewsletter);
    }

    onClose();
  };

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

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
  };

  const errorOnPreviewImage = () => {
    toast.error(MESSAGES.ERROR.IMAGE_NOT_UPLOAD);
    setPreviewUrl(newsletter?.image ?? defaultImage);
  };

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="w-full z-10">
          <div className="flex flex-col pb-4 px-4 rounded w-full">
            <label>Título</label>
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

          <div className="flex flex-col pb-4 px-4 rounded w-full">
            <label>Descripción</label>
            <Field
              as="textarea"
              name="description"
              rows="5"
              className="bg-cas-white p-2 mt-2 border-cas-gray-mid border-[0.5px] rounded break-all"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="flex flex-col pb-4 px-4 rounded w-full">
            <LabelSelector
              labels={labels}
              onAddLabel={handleAddLabel}
              onRemoveLabel={handleRemoveLabel}
            />
          </div>

          <div className="flex flex-row justify-center items-center flex-wrap w-full">
            <div className="flex flex-col bg-white p-4 rounded max-w-[600px] min-w-[200px] lg:w-1/2 w-full">
              <label>Fecha de publicación</label>
              <Field
                type="datetime-local"
                name="publishDate"
                className="bg-cas-white p-2 my-2 border-cas-gray-mid border-[0.5px] rounded h-15 overflow-x-auto whitespace-nowrap"
                onChange={handlePublishDateChange(setFieldValue)}
              />
              <ErrorMessage
                name="publishDate"
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
            <label>
              Selecciona una imagen para la portada de la noticia (.webp)
            </label>
            <input
              type="file"
              accept="image/webp"
              ref={fileInputRef}
              onChange={onChangeImage}
              className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded w-full"
            />
            <div className="relative w-full h-[300px] overflow-hidden">
              <Image
                src={previewUrl || defaultImage}
                alt="Vista previa"
                className="object-cover object-center w-full h-full"
                width={1920}
                height={300}
                onError={errorOnPreviewImage}
              />
            </div>
          </div>

          <div className="flex justify-end mr-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-6 py-2 rounded shadow-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
