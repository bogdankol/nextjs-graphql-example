import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/chadcn/components/ui/pagination";

export default function PaginationComponent({
  setCurrentPage,
  totalPages = 5,
  currentPage,
}: {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  currentPage: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            size={1}
          />
        </PaginationItem>

        {/* First page (only if not current) */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setCurrentPage(1)} size={1}>
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Ellipsis before current page */}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Middle pages: current ±1, but skip first/last */}
        {pages
          .filter((p) => p !== 1 && p !== totalPages)
          .filter(
            (p) =>
              p === currentPage ||
              p === currentPage - 1 ||
              p === currentPage + 1
          )
          .map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                onClick={() => setCurrentPage(p)}
                className={p === currentPage ? "font-bold" : ""}
                size={1}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis after current page */}
        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page (only if not current) */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => setCurrentPage(totalPages)} size={1}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            size={1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
