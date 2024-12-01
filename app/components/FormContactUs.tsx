import React, { useEffect, useState } from "react";
import { getContacts } from "../api/contactUs";
import { ContactUs } from "../models";

export const FormContactUs = () => {
  const [contacts, setContacts] = useState<ContactUs[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchContacts = async (currentPage: number) => {
    try {
      const { results, pagination } = await getContacts(currentPage, 5);
      setContacts(results);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchContacts(page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="w-2/3 sm:w-3/5">
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 py-5 rounded-t-lg">
        <h1 className="text-lg font-semibold px-4">
          Lista de mensajes de contacto
        </h1>
      </div>

      <div className="overflow-y-auto border border-cas-gray-light rounded-b-lg">
        <div className="flex bg-gray-100 font-semibold border-b border-cas-gray-light">
          <div className="w-3/12 px-6 py-3">Fecha</div>
          <div className="w-4/12 px-6 py-3">Nombres</div>
          <div className="w-5/12 px-6 py-3">Email</div>
          <div className="w-2/12 px-6 py-3">Celular</div>
          <div className="w-3/12 px-6 py-3">Mensaje</div>
        </div>
        {contacts.map((contact) => (
          <div key={contact.id} className="flex border-b border-cas-gray-light">
            <div className="w-3/12 px-6 py-3">
              {new Date(contact.publishDate).toLocaleString()}
            </div>
            <div className="w-4/12 px-6 py-3">
              {`${contact.names} ${contact.lastNames}`}
            </div>
            <div className="w-5/12 px-6 py-3">{contact.email}</div>
            <div className="w-2/12 px-6 py-3">{contact.cellphone}</div>
            <div className="w-3/12 px-6 py-3">{contact.message}</div>
          </div>
        ))}
        {contacts.length === 0 && (
          <div className="text-center py-6">No hay contactos disponibles</div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`py-3 px-4 min-w-32 text-[14px] rounded-lg ${
            page === 1
              ? "bg-cas-gray-light text-gray-400"
              : "bg-cas-green text-cas-white hover:shadow-md hover:opacity-90"
          }`}
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {page} de {totalPages}
        </span>
        <button
          className={`py-3 px-4 min-w-32 text-[14px] rounded-lg ${
            page === totalPages
              ? "bg-cas-gray-light text-gray-400"
              : "bg-cas-green text-cas-white hover:shadow-md hover:opacity-90"
          }`}
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
