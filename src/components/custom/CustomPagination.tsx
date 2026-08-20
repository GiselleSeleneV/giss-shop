import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") ?? "1";

  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const visiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 3) return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [page - 2, page - 1, page, page + 1, page + 2];
  };

  return (
    <div
      className="animate-fade-up flex flex-wrap items-center justify-center gap-1 sm:gap-2 px-3 pb-8"
      style={{ animationDelay: "280ms" }}
    >
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Anterior</span>
      </Button>

      {visiblePages().map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={page === pageNumber ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages || totalPages === 0}
        onClick={() => handlePageChange(page + 1)}
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
