"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationComponent({
  totalPages,
  className,
  setPage,
}: {
  totalPages: number;
  className: string;
  setPage: any;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    let pages = [];

    // Near the beginning
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (totalPages > 3) {
        pages.push(<PaginationEllipsis key="end-ellipsis" />);
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink
              href="#"
              isActive={totalPages === currentPage}
              onClick={() => handlePageClick(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Near the end
    else if (currentPage >= totalPages - 2) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={1 === currentPage}
            onClick={() => handlePageClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Middle range
    else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={1 === currentPage}
            onClick={() => handlePageClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageClick(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={totalPages === currentPage}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePreviousClick} />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
