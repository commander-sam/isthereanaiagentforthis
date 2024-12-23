import { useMemo } from 'react';

interface PaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

export function usePagination<T>(
  items: T[],
  page: number,
  itemsPerPage: number,
  setPage: (page: number) => void
): PaginationResult<T> {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  // Ensure current page is within bounds
  const currentPage = Math.min(Math.max(1, page), totalPages);
  
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (newPage: number) => {
    setPage(Math.min(Math.max(1, newPage), totalPages));
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    goToPage
  };
}