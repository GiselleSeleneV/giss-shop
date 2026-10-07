import gissApi from "@/api/gissApi";
import type { Product } from "@/interfaces/product.interface";
import {
  getProductImageUrl,
  toStoredProductImage,
} from "@/shop/helpers/product-image";

export const createUpdateProductAction = async (
  productLike: Partial<Product> & { files?: File[] },
): Promise<Product> => {
  const { id, user, images = [], files = [], ...rest } = productLike;

  const isCreating = !id || id === "new";

  rest.stock = Number(rest.stock || 0);
  rest.price = Number(rest.price || 0);

  const keptImages = images.map(toStoredProductImage).filter(Boolean);
  const uploadedImages = files.length > 0 ? await uploadFiles(files) : [];
  const imagesToSave = [...keptImages, ...uploadedImages];

  const { data } = await gissApi<Product>({
    url: isCreating ? "/products" : `/products/${id}`,
    method: isCreating ? "POST" : "PATCH",
    data: {
      ...rest,
      images: imagesToSave,
    },
  });

  return {
    ...data,
    images: imagesToSave.map(getProductImageUrl),
  };
};

interface FileResponse {
  secureUrl: string;
  fileName?: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await gissApi.post<FileResponse>(
      "/files/product",
      formData,
    );

    const imageUrl = data.secureUrl || data.fileName;
    if (!imageUrl) {
      throw new Error("El servidor no devolvió la URL de la imagen.");
    }

    return imageUrl;
  });

  return Promise.all(uploadPromises);
};
