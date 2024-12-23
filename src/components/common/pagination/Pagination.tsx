import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import NavigationButton from './NavigationButton';
import PageButton from './PageButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of visible pages
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if at the start
    if (currentPage <= 3) {
      end = Math.min(4, totalPages - 1);
    }

    // Adjust if at the end
    if (currentPage >= totalPages - 2) {
      start = Math.max(2, totalPages - 3);
    }

    // Add ellipsis and numbers
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 1) pages.push('...');

    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
      <div className="flex items-center">
        <p className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <NavigationButton
          icon={ChevronsLeft}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          label="First page"
        />
        <NavigationButton
          icon={ChevronLeft}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          label="Previous page"
        />
        
        <div className="flex space-x-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <PageButton
                key={index}
                page={page}
                isActive={currentPage === page}
                onClick={onPageChange}
              />
            ) : (
              <span key={index} className="px-2 py-2 text-gray-400">
                {page}
              </span>
            )
          ))}
        </div>

        <NavigationButton
          icon={ChevronRight}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          label="Next page"
        />
        <NavigationButton
          icon={ChevronsRight}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          label="Last page"
        />
      </div>
    </div>
  );
}