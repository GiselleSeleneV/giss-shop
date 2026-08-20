export const getProductImageUrl = (image: string) => {
  if (image.startsWith("http")) return image;

  return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
};
