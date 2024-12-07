import React, { useState } from "react";
import { Subsection, UpdateSubsectionContent } from "../models";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Modal } from "./Modal";
import { CustomButton } from "./CustomButton";
import { updateSubsectionById } from "../api/subsection";
import { AdminCommunityTable } from "./AdminCommunityTable";

const ModalTypes = {
  ADVANTAGE: "advantage",
  BENEFIT: "benefit",
};

interface FormSubsectionContentProps {
  id: string;
  subsection: Subsection | undefined;
  onContentUpdated: () => void;
}

interface Item {
  description: string;
}

interface CommunityContent {
  advantages: { items: Item[] };
  benefits: { items: Item[] };
  cta: {
    url: string;
  };
}

export const FormCommunity = ({
  id,
  subsection,
  onContentUpdated,
}: FormSubsectionContentProps) => {
  const communityContent = subsection?.content as CommunityContent;
  const initialValues = {
    content: communityContent,
  };

  const validationSchema = Yup.object({
    content: Yup.object({
      cta: Yup.object({
        url: Yup.string().required("La url es requerida"),
      }),
    }),
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openModal = (type: string, index: number | null = null) => {
    setModalType(type);
    setEditingIndex(index);

    if (index !== null) {
      const currentItem =
        type === ModalTypes.ADVANTAGE
          ? communityContent.advantages.items[index]
          : communityContent.benefits.items[index];
      setModalContent(currentItem.description);
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
    setEditingIndex(null);
  };

  const updateContent = (type: string, index: number | null) => {
    const contentArray =
      type === ModalTypes.ADVANTAGE
        ? communityContent.advantages.items
        : communityContent.benefits.items;

    if (index !== null) {
      contentArray[index].description = modalContent;
    } else {
      contentArray.push({ description: modalContent });
    }
  };

  const onSubmit = async () => {
    if (modalType) {
      updateContent(modalType, editingIndex);
      const communityData = {
        content: communityContent,
      } as UpdateSubsectionContent;

      await updateSubsectionById(id, communityData);
      closeModal();
      onContentUpdated();
    }
  };

  const onSubmitCta = async (values: UpdateSubsectionContent) => {
    await updateSubsectionById(id, values);
  }

  const deleteItem = async (type: string, index: number) => {
    const contentArray =
      type === ModalTypes.ADVANTAGE
        ? communityContent.advantages.items
        : communityContent.benefits.items;

    contentArray.splice(index, 1);

    const communityData = {
      content: communityContent,
    } as UpdateSubsectionContent;
    await updateSubsectionById(id, communityData);
    onContentUpdated();
  };

  return (
    <div className="w-2/3 sm:w-3/5">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
          <h1 className="text-lg font-semibold px-4">CTA</h1>
        </div>

        <div className="overflow-y-auto border border-cas-gray-light rounded-b-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitCta}
          >
            {({ isSubmitting }) => (
              <Form className="w-full z-10">
                <div className="pt-4 px-8 pb-2 flex flex-row justify-center items-center flex-wrap w-full">
                  <div className="flex flex-col rounded w-full">
                    <label>Enlace de redirección</label>
                    <Field
                      type="text"
                      name="content.cta.url"
                      className="bg-cas-white p-2 mt-2 mb-2 border-cas-gray-mid border-[0.5px] rounded break-all"
                    />
                    <ErrorMessage
                      name="content.cta.url"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end mr-8 mb-4">
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
      </section>

      <br />

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
          <h1 className="text-lg font-semibold px-4">Lista de Ventajas</h1>
          <div className="py-2 px-4">
            <CustomButton onClick={() => openModal(ModalTypes.ADVANTAGE)}>
              <span>Nueva ventaja</span>
            </CustomButton>
          </div>
        </div>
        <AdminCommunityTable
          items={communityContent.advantages.items}
          onEdit={(index) => openModal(ModalTypes.ADVANTAGE, index)}
          onDelete={(index) => deleteItem(ModalTypes.ADVANTAGE, index)}
          modalType="Ventaja"
        />
      </section>

      <br />

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
          <h1 className="text-lg font-semibold px-4">Lista de Beneficios</h1>
          <div className="py-2 px-4">
            <CustomButton onClick={() => openModal(ModalTypes.BENEFIT)}>
              <span>Nuevo beneficio</span>
            </CustomButton>
          </div>
        </div>
        <AdminCommunityTable
          items={communityContent.benefits.items}
          onEdit={(index) => openModal(ModalTypes.BENEFIT, index)}
          onDelete={(index) => deleteItem(ModalTypes.BENEFIT, index)}
          modalType="Beneficio"
        />
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${editingIndex !== null ? "Editar" : "Añadir"} ${
          modalType === ModalTypes.ADVANTAGE ? "Ventaja" : "Beneficio"
        }`}
      >
        <textarea
          className="w-full h-20 border rounded p-2"
          value={modalContent}
          onChange={(e) => setModalContent(e.target.value)}
        />
        <div className="flex justify-end pt-3">
          <CustomButton onClick={onSubmit}>Guardar cambio</CustomButton>
        </div>
      </Modal>
    </div>
  );
};
