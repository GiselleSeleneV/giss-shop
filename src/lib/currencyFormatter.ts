export const currencyFormatter = (price: number) => {
  return price.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
};
