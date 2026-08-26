import { Navigate, useNavigate, useParams } from "react-router";
import { useProduct } from "@/admin/hooks/useProduct";
import { ProductForm } from "./ui/ProductForm";
import { CustomLoading } from "@/components/custom/CustomLoading";
import type { Product } from "@/interfaces/product.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
  const { idSlug = "" } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: product, mutation } = useProduct(idSlug);

  const title = idSlug === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    idSlug === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const handleSubmitForm = async (
    productLike: Partial<Product> & { files?: File[] },
  ) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success("Producto actualizado correctamente", {
          position: "top-right",
        });
        navigate(`/admin/product/${data.id}`);
      },
      onError: (error) => {
        toast.error("Error al actualizar el producto", {
          position: "top-right",
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  if (isLoading) {
    return <CustomLoading />;
  }

  if (!product) {
    return <Navigate to="/admin/products" />;
  }

  return (
    <ProductForm
      title={title}
      subTitle={subtitle}
      product={product}
      onSubmit={handleSubmitForm}
      isPending={mutation.isPending}
    />
  );
};
