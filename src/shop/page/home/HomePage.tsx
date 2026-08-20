import { CustomLoading } from "@/components/custom/CustomLoading";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { PageEnter } from "@/components/custom/PageEnter";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";

export const HomePage = () => {
  const { data, isLoading } = useProducts();

  return (
    <PageEnter>
      <CustomJumbotron
        title="Todos los productos"
        description="Ropa minimalista y elegante inspirada en el diseño orgánico de Giss. Calidad premium para un estilo atemporal."
      />

      {isLoading ? (
        <div className="animate-fade-up">
          <CustomLoading message="Cargando productos" />
        </div>
      ) : (
        <>
          <ProductsGrid products={data?.products || []} />
          <CustomPagination totalPages={data?.pages || 0} />
        </>
      )}
    </PageEnter>
  );
};
