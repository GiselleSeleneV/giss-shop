import gissApi from "@/api/gissApi";
import type { Product } from "@/interfaces/product.interface";
import { getProductImageUrl } from "../helpers/product-image";

export const getProductAction = async (term: string): Promise<Product> => {
  const { data } = await gissApi.get<Product>(`/products/${term}`);

  return {
    ...data,
    images: data.images.map(getProductImageUrl),
  };
};
