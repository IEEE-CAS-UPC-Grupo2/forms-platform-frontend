import React, { useState } from "react";
import { Subsection, UpdateSubsectionContent } from "../models";
import { Modal } from "./Modal";
import { CustomButton } from "./CustomButton";
import { updateSubsectionById } from "../api/subsection";
import { AdminObjectiveGoalTable } from "./AdminObjectiveGoalTable";

const ModalTypes = {
  OBJECTIVE: "objective",
  GOAL: "goal",
};

interface FormSubsectionContentProps {
  id: string;
  subsection: Subsection | undefined;
  onContentUpdated: () => void;
}

interface Item {
  description: string;
}

interface ObjectivesGoalsContent {
  objectives: { items: Item[] };
  goals: { items: Item[] };
}

export const FormObjectivesGoals = ({
  id,
  subsection,
  onContentUpdated,
}: FormSubsectionContentProps) => {
  const objectivesGoalsContent = subsection?.content as ObjectivesGoalsContent;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openModal = (type: string, index: number | null = null) => {
    setModalType(type);
    setEditingIndex(index);

    if (index !== null) {
      const currentItem =
        type === ModalTypes.OBJECTIVE
          ? objectivesGoalsContent.objectives.items[index]
          : objectivesGoalsContent.goals.items[index];
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
      type === ModalTypes.OBJECTIVE
        ? objectivesGoalsContent.objectives.items
        : objectivesGoalsContent.goals.items;
        
    if (index !== null) {
      contentArray[index].description = modalContent;
    } else {
      contentArray.push({ description: modalContent });
    }
  };

  const onSubmit = async () => {
    if (modalType) {
      updateContent(modalType, editingIndex);
      const objectivesGoalsData = {
        content: objectivesGoalsContent,
      } as UpdateSubsectionContent;
      await updateSubsectionById(id, objectivesGoalsData);
      closeModal();
      onContentUpdated();
    }
  };

  const deleteItem = async (type: string, index: number) => {
    const contentArray =
      type === ModalTypes.OBJECTIVE
        ? objectivesGoalsContent.objectives.items
        : objectivesGoalsContent.goals.items;
    contentArray.splice(index, 1);

    const objectivesGoalsData = {
      content: objectivesGoalsContent,
    } as UpdateSubsectionContent;
    await updateSubsectionById(id, objectivesGoalsData);
    onContentUpdated();
  };

  return (
    <div className="w-2/3 sm:w-3/5">
      <section>
        <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
          <h1 className="text-lg font-semibold px-4">Lista de Objetivos</h1>
          <div className="py-2 px-4">
            <CustomButton onClick={() => openModal(ModalTypes.OBJECTIVE)}>
              <span>Nuevo objetivo</span>
            </CustomButton>
          </div>
        </div>
        <AdminObjectiveGoalTable
          items={objectivesGoalsContent.objectives.items}
          onEdit={(index) => openModal(ModalTypes.OBJECTIVE, index)}
          onDelete={(index) => deleteItem(ModalTypes.OBJECTIVE, index)}
          modalType="Objetivo"
        />
      </section>

      <br />

      <section>
        <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
          <h1 className="text-lg font-semibold px-4">Lista de Metas</h1>
          <div className="py-2 px-4">
            <CustomButton onClick={() => openModal(ModalTypes.GOAL)}>
              <span>Nueva meta</span>
            </CustomButton>
          </div>
        </div>
        <AdminObjectiveGoalTable
          items={objectivesGoalsContent.goals.items}
          onEdit={(index) => openModal(ModalTypes.GOAL, index)}
          onDelete={(index) => deleteItem(ModalTypes.GOAL, index)}
          modalType="Meta"
        />
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={`${editingIndex !== null ? "Editar" : "Añadir"} ${
          modalType === ModalTypes.OBJECTIVE ? "Objetivo" : "Meta"
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
