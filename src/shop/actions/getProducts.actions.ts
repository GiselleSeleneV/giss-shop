import gissApi from "@/api/gissApi";
import type { ProductsResponse } from "@/interfaces/products.response";
import { getProductImageUrl } from "../helpers/product-image";

interface Options {
  limit?: number | string;
  offset?: number | string;
  sizes?: string;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  querry?: string;
}

export const getProductsAction = async (
  options?: Options,
): Promise<ProductsResponse> => {
  const { limit, offset, sizes, gender, minPrice, maxPrice, querry } =
    options || {};

  const response = await gissApi.get<ProductsResponse>("/products", {
    params: {
      limit,
      offset,
      sizes,
      gender,
      minPrice,
      maxPrice,
      q: querry,
    },
  });

  const productWhitImageUrls = response.data.products.map((product) => ({
    ...product,

    images: product.images.map(getProductImageUrl),
  }));

  return {
    ...response.data,
    products: productWhitImageUrls,
  };
};
