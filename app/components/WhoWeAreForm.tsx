import { Subsection, UpdateSubsectionContent } from "../models";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { updateSubsectionById } from "../api/subsection";
import { uploadImage } from "../api/images-api";
import Image from "next/image";
import toast from "react-hot-toast";
import { MESSAGES } from "../admin/constants";
import { useRef, useState, useEffect } from "react";

interface SubsectionContentProps {
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

export const WhoWeAreForm = ({ id, subsection }: SubsectionContentProps) => {
  const defaultImage =
    "https://via.placeholder.com/1920x300?text=Imagen+por+defecto";
  const whoWeAreContent: WhoWeAreContent =
    subsection?.content as WhoWeAreContent;

  const [imageFirstFragmentFile, setImageFirstFragmentFile] =
    useState<File | null>(null);
  const [previewFirstFragmentUrl, setPreviewFirstFragmentUrl] = useState(
    whoWeAreContent.aboutIeee[0].image || defaultImage
  );

  const [imageSecondFragmentFile, setImageSecondFragmentFile] =
    useState<File | null>(null);
  const [previewSecondFragmentUrl, setPreviewSecondFragmentUrl] = useState(
    whoWeAreContent.aboutIeee[1].image || defaultImage
  );

  const firstFragmentFileInputRef = useRef<HTMLInputElement | null>(null);
  const secondFragmentFileInputRef = useRef<HTMLInputElement | null>(null);

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
    const content = values.content as WhoWeAreContent;

    const imageFirstFragmentUrl = imageFirstFragmentFile
      ? await uploadImage(imageFirstFragmentFile)
      : content.aboutIeee[0].image;

    const imageSecondFragmentUrl = imageSecondFragmentFile
      ? await uploadImage(imageSecondFragmentFile)
      : content.aboutIeee[1].image;

    if (imageFirstFragmentUrl) {
      content.aboutIeee[0].image = imageFirstFragmentUrl;
    }

    if (imageSecondFragmentUrl) {
      content.aboutIeee[1].image = imageSecondFragmentUrl;
    }

    values.content = content;

    await updateSubsectionById(id, values);

    if (firstFragmentFileInputRef.current) {
      firstFragmentFileInputRef.current.files = null;
      setImageFirstFragmentFile(null);
    }

    if (secondFragmentFileInputRef.current) {
      secondFragmentFileInputRef.current.files = null;
      setImageSecondFragmentFile(null);
    }
  };

  const onChangeFirstFragmentImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const isWebP = file.type === "image/webp";

      if (!isWebP) {
        toast.error(MESSAGES.ERROR.IMAGE_NOT_WEBP);
        return;
      }

      if (fileSizeMB > 30) {
        setImageFirstFragmentFile(null);
        errorOnPreviewFirstFragmentImage();
      } else {
        setImageFirstFragmentFile(file);
        setPreviewFirstFragmentUrl(URL.createObjectURL(file));
      }
    }
  };

  const onChangeSecondFragmentImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);
      const isWebP = file.type === "image/webp";

      if (!isWebP) {
        toast.error(MESSAGES.ERROR.IMAGE_NOT_WEBP);
        return;
      }

      if (fileSizeMB > 30) {
        setImageSecondFragmentFile(null);
        errorOnPreviewSecondFragmentImage();
      } else {
        setImageSecondFragmentFile(file);
        setPreviewSecondFragmentUrl(URL.createObjectURL(file));
      }
    }
  };

  const errorOnPreviewFirstFragmentImage = () => {
    toast.error(MESSAGES.ERROR.IMAGE_NOT_UPLOAD);
    setPreviewFirstFragmentUrl(defaultImage);
  };

  const errorOnPreviewSecondFragmentImage = () => {
    toast.error(MESSAGES.ERROR.IMAGE_NOT_UPLOAD);
    setPreviewSecondFragmentUrl(defaultImage);
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

                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/webp"
                      ref={firstFragmentFileInputRef}
                      onChange={onChangeFirstFragmentImage}
                      className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded w-full"
                    />
                    <div className="relative w-full h-[300px] overflow-hidden">
                      <Image
                        src={previewFirstFragmentUrl || defaultImage}
                        alt="Vista previa de la imagen para el primer fragmento"
                        className="mt-2"
                        width={1920}
                        height={300}
                        onError={errorOnPreviewFirstFragmentImage}
                      />
                    </div>
                  </div>
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
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/webp"
                      ref={secondFragmentFileInputRef}
                      onChange={onChangeSecondFragmentImage}
                      className="bg-cas-white p-2 mb-2 border-cas-gray-mid border-[0.5px] rounded w-full"
                    />
                    <div className="relative w-full h-[300px] overflow-hidden">
                      <Image
                        src={previewSecondFragmentUrl || defaultImage}
                        alt="Vista previa de la imagen para el segundo fragmento"
                        className="mt-2"
                        width={1920}
                        height={300}
                        onError={errorOnPreviewSecondFragmentImage}
                      />
                    </div>
                  </div>
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
                Guardar cambio
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
