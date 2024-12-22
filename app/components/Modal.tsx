import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cas-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-cas-white rounded-lg shadow-lg w-11/12 sm:w-1/2 p-4 transition-transform transform scale-90"
        style={{ animation: "fadeIn 0.3s ease-out" }}
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="mt-4 max-h-[90vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
