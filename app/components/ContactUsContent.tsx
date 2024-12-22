import React, { useEffect, useState } from "react";
import { getContacts } from "../api/contact-us";
import { ContactUs } from "../models";
import { PaginatorTable } from "./PaginatorTable";
import { AdminContactUsTable } from "./AdminContactUsTable";

export const ContactUsContent = () => {
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

  return (
    <div className="w-2/3 sm:w-3/5">
      <div className="flex flex-col md:flex-row justify-between items-center bg-cas-gray-light p-2 py-5 rounded-t-lg">
        <h1 className="text-lg font-semibold px-4">
          Lista de mensajes de contacto
        </h1>
      </div>

      <AdminContactUsTable contacts={contacts} />
      <PaginatorTable page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};
