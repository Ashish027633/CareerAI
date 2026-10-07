import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  pageSize = 10,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 py-3 ${className}`}>
      {totalItems > 0 && (
        <p className="text-xs text-slate-muted">
          Showing <span className="font-semibold text-slate-text">{startItem}</span> to{' '}
          <span className="font-semibold text-slate-text">{endItem}</span> of{' '}
          <span className="font-semibold text-slate-text">{totalItems}</span> results
        </p>
      )}

      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={ChevronLeft}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <div className="px-3 py-1 text-xs font-semibold text-slate-text bg-dark-subtle rounded-md border border-border-dark">
          {currentPage} / {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon={ChevronRight}
          iconPosition="right"
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
