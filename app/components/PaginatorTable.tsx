import React from "react";

interface PaginatorTableProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PaginatorTable = ({
  page,
  totalPages,
  setPage,
}: PaginatorTableProps) => {
  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
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
  );
};
