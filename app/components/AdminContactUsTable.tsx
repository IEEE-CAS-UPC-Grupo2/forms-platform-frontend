import React, { useState } from "react";
import { ContactUs } from "../models";

interface ContactUsTableProps {
  contacts: ContactUs[];
}

interface TruncatedMessageProps {
  message: string;
  maxLength?: number;
}

const TruncatedMessage = ({
  message,
  maxLength = 50,
}: TruncatedMessageProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const shouldTruncate = message.length > maxLength;

  return (
    <div>
      {shouldTruncate && !isExpanded
        ? `${message.substring(0, maxLength)}...`
        : message}
      {shouldTruncate && (
        <button
          onClick={toggleExpanded}
          className="text-blue-500 ml-2 underline"
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
};

export const AdminContactUsTable = ({ contacts }: ContactUsTableProps) => {
  return (
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
          <div className="w-3/12 px-6 py-3">
            <TruncatedMessage message={contact.message} />
          </div>
        </div>
      ))}
      {contacts.length === 0 && (
        <div className="text-center py-6">No hay contactos disponibles</div>
      )}
    </div>
  );
};
