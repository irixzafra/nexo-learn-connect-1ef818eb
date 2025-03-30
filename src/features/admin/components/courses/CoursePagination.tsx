
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface CoursePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CoursePagination: React.FC<CoursePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Check if the previous/next buttons should be clickable
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const renderPageNumbers = () => {
    return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
      let pageNum;
      if (totalPages <= 5) {
        pageNum = i + 1;
      } else if (currentPage <= 3) {
        pageNum = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageNum = totalPages - 4 + i;
      } else {
        pageNum = currentPage - 2 + i;
      }
      
      return (
        <PaginationItem key={pageNum}>
          <PaginationLink 
            onClick={() => onPageChange(pageNum)} 
            isActive={currentPage === pageNum}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => !isPreviousDisabled && onPageChange(Math.max(1, currentPage - 1))}
              className={isPreviousDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {renderPageNumbers()}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => !isNextDisabled && onPageChange(Math.min(totalPages, currentPage + 1))}
              className={isNextDisabled ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CoursePagination;
