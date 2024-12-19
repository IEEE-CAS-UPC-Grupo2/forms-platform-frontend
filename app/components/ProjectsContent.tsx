import { useState, useEffect } from "react";
import { Project } from "../models";
import { deleteProject, getProjects, toggleFeatured } from "../api/project";
import { CustomButton } from "./CustomButton";
import { PaginatorTable } from "./PaginatorTable";
import { AdminProjectTable } from "./AdminProjectTable";
import { Modal } from "./Modal";
import { ProjectModalForm } from "./ProjectModalForm";
import { showConfirmationAlert } from "../utils/alerts";

export const ProjectsContent = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openModal = (project: Project | null = null) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingProject(null);
    setModalOpen(false);
    fetchProjects(page);
  };

  const onToggleFeatured = async (id: string) => {
    const confirmed = await showConfirmationAlert(
      "¿Confirma que desea destacar este proyecto?",
      "Si está seguro, haga clic en 'OK' para confirmar los cambios."
    );

    if (!confirmed) return;

    await toggleFeatured(id);
    fetchProjects(page);
  };

  const onDeleteProject = async (id: string) => {
    const confirmed = await showConfirmationAlert(
      "¿Está seguro de eliminar este proyecto?",
      "Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    await deleteProject(id);
    fetchProjects(page);
  };

  const fetchProjects = async (currentPage: number) => {
    try {
      const { results, pagination } = await getProjects(currentPage, 5);
      setProjects(results);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(page);
  }, [page]);

  return (
    <div className="w-2/3 sm:w-3/5">
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 rounded-t-lg">
        <h1 className="text-lg font-semibold px-4">Lista de Proyectos</h1>
        <div className="py-2 px-4">
          <CustomButton onClick={() => openModal()}>
            <span>Nuevo proyecto</span>
          </CustomButton>
        </div>
      </div>

      <AdminProjectTable
        projects={projects}
        onEdit={(project) => openModal(project)}
        onDelete={(id) => onDeleteProject(id)}
        onToggleFeatured={(id) => onToggleFeatured(id)}
      />
      <PaginatorTable page={page} totalPages={totalPages} setPage={setPage} />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingProject ? "Editar proyecto" : "Añadir proyecto"}
      >
        <ProjectModalForm
          project={editingProject}
          onClose={closeModal}
        ></ProjectModalForm>
      </Modal>
    </div>
  );
};
