import { CustomLoading } from "@/components/custom/CustomLoading";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { PageEnter } from "@/components/custom/PageEnter";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import { useProducts } from "@/shop/hooks/useProducts";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
  const { data, isLoading } = useProducts();

  const genderLabel =
    gender === "men" ? "Hombres" : gender === "women" ? "Mujeres" : "Niños";

  return (
    <PageEnter key={gender}>
      <CustomJumbotron
        title={`Productos para ${genderLabel}`}
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
