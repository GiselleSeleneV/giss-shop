import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { FilterSidebar } from "./FilterSidebar";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import type { Product } from "@/interfaces/product.interface";

interface ProductsProps {
  products: Product[];
  // name: string;
  // price: number;
  // image: string;
  // category: string;
}

export const ProductsGrid = ({ products }: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const viewMode = searchParams.get("viewMode") || "grid";

  const handleViewModeClick = (mode: "grid" | "list") => {
    searchParams.set("viewMode", mode);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  return (
    <section className="py-4 px-4 lg:px-8">
      <div className="container mx-auto">
        <div className="animate-fade-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-baseline gap-3 sm:space-x-4">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-light tracking-tight text-navy">
              Productos
            </h2>
            <span className="text-sm text-muted-foreground tracking-wide">
              {products.length} piezas
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden border-gold/40"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>

            <div className="hidden md:flex border border-gold/30 rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewModeClick("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => handleViewModeClick("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div
            className="hidden lg:block animate-fade-up shrink-0"
            style={{ animationDelay: "80ms" }}
          >
            <FilterSidebar />
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-[55] lg:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
                onClick={() => setShowFilters(false)}
                aria-label="Cerrar filtros"
              />
              <div className="absolute inset-y-0 left-0 w-full max-w-sm overflow-y-auto bg-white p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-montserrat text-lg font-light tracking-[0.16em] uppercase">
                  Filtros
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                >
                  Cerrar
                </Button>
              </div>
              <FilterSidebar />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="min-w-0 flex-1">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.title}
                  price={product.price}
                  image={product.images[0] || ""}
                  category={product.gender}
                  sizes={product.sizes}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
