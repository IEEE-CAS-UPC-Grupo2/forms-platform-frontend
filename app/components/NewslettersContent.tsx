import { useState, useEffect } from "react";
import { Newsletter } from "../models";
import {
  deleteNewsletter,
  getNewsletters,
  toggleFeatured,
} from "../api/newsletter";
import { AdminNewsletterTable } from "./AdminNewsletterTable";
import { CustomButton } from "./CustomButton";
import { PaginatorTable } from "./PaginatorTable";
import { showConfirmationAlert } from "../utils/alerts";
import { Modal } from "./Modal";
import { NewsletterModalForm } from "./NewsletterModalForm";

export const NewslettersContent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingNewsletter, setEditingNewsletter] = useState<Newsletter | null>(
    null
  );

  const openModal = (project: Newsletter | null = null) => {
    setEditingNewsletter(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingNewsletter(null);
    setModalOpen(false);
    fetchNewsletters(page);
  };

  const onToggleFeatured = async (id: string) => {
    const confirmed = await showConfirmationAlert(
      "¿Confirma que desea destacar esta noticia?",
      "Si está seguro, haga clic en 'OK' para confirmar los cambios."
    );

    if (!confirmed) return;

    await toggleFeatured(id);
    fetchNewsletters(page);
  };

  const onDeleteNewsletter = async (id: string) => {
    const confirmed = await showConfirmationAlert(
      "¿Está seguro de eliminar este proyecto?",
      "Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    await deleteNewsletter(id);
    fetchNewsletters(page);
  };

  const fetchNewsletters = async (currentPage: number) => {
    try {
      const { results, pagination } = await getNewsletters(currentPage, 5);
      setNewsletters(results);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  useEffect(() => {
    fetchNewsletters(page);
  }, [page]);

  return (
    <div className="w-2/3 sm:w-3/5">
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
        <h1 className="text-lg font-semibold px-4">Lista de Noticias</h1>
        <div className="py-2 px-4">
          <CustomButton onClick={() => openModal()}>
            <span>Nueva noticia</span>
          </CustomButton>
        </div>
      </div>

      <AdminNewsletterTable
        newsletters={newsletters}
        onEdit={(project) => openModal(project)}
        onDelete={(id) => onDeleteNewsletter(id)}
        onToggleFeatured={(id) => onToggleFeatured(id)}
      />
      <PaginatorTable page={page} totalPages={totalPages} setPage={setPage} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingNewsletter ? "Editar noticia" : "Añadir noticia"}
      >
        <NewsletterModalForm
          newsletter={editingNewsletter}
          onClose={closeModal}
        ></NewsletterModalForm>
      </Modal>
    </div>
  );
};
