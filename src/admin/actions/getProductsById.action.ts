import gissApi from "@/api/gissApi";
import type { Product } from "@/interfaces/product.interface";
import { getProductImageUrl } from "@/shop/helpers/product-image";

export const getProductsByIdAction = async (id: string): Promise<Product> => {
  if (!id) throw new Error("Id is required");

  if (id === "new")
    return {
      id: "",
      title: "",
      description: "",
      slug: "",
      price: 0,
      stock: 0,
      tags: [],
      images: [],
      sizes: [],
      gender: "men",
    } as unknown as Product;

  const { data } = await gissApi.get<Product>(`/products/${id}`);

  return {
    ...data,
    images: data.images.map(getProductImageUrl),
  };
};
