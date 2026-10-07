const filesPath = "/files/product/";

export const getProductImageUrl = (image?: string | null) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const api = String(import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  return `${api}${filesPath}${image}`;
};

export const toStoredProductImage = (image: string) => {
  if (!image) return "";

  if (!image.startsWith("http://") && !image.startsWith("https://")) {
    return image;
  }

  const api = String(import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
  const filesBase = `${api}${filesPath}`;

  if (!image.startsWith(filesBase)) return image;

  const fileName = image.slice(filesBase.length).split(/[?#]/)[0];
  return decodeURIComponent(fileName);
};
