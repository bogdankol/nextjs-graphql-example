import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/chadcn/components/ui/pagination";
import React from 'react';

export default function PaginationComponent({
  setCurrentPage,
  totalPages = 5,
  currentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
}) {
  const visiblePages = new Set<number>();

  // Always show first and last
  visiblePages.add(1);
  visiblePages.add(totalPages);

  // Add current page ±2
  for (let offset = -2; offset <= 2; offset++) {
    const page = currentPage + offset;
    if (page > 1 && page < totalPages) {
      visiblePages.add(page);
    }
  }

  // Turn into sorted array
  const pages = Array.from(visiblePages).sort((a, b) => a - b);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            size={0}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
        </PaginationItem>

        {pages.map((page, idx) => {
          const prevPage = pages[idx - 1];

          // Insert ellipsis if there’s a gap > 1
          if (prevPage && page - prevPage > 1) {
            return (
              <React.Fragment key={page}>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    size={0}
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? "font-bold" : ""}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                size={0}
                onClick={() => setCurrentPage(page)}
                className={page === currentPage ? "font-bold" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            size={0}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
