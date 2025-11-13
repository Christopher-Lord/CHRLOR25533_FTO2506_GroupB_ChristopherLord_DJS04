import { useState } from "react";

export function usePagination(data, itemsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const start = 0;
  const end = currentPage * itemsPerPage;
  const paginatedData = data.slice(start, end);

  function loadMore() {
    if (currentPage < totalPages) setCurrentPage((current) => current + 1);
  }

  function resetPagination() {
    setCurrentPage(1);
  }

  return {
    currentPage,
    totalPages,
    paginatedData,
    loadMore,
    resetPagination,
  };
}
