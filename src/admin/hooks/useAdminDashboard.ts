import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "@/shop/actions/getProducts.actions";
import { useUsers } from "./useUsers";
import type { Product } from "@/interfaces/product.interface";
import type { User } from "@/interfaces/user.interface";

const LOW_STOCK_MAX = 5;
const DASHBOARD_PRODUCT_LIMIT = 200;

const isOutOfStock = (product: Product) => Number(product.stock || 0) <= 0;
const isLowStock = (product: Product) => {
  const stock = Number(product.stock || 0);
  return stock > 0 && stock <= LOW_STOCK_MAX;
};

export const useAdminDashboard = () => {
  const productsQuery = useQuery({
    queryKey: ["products", "dashboard"],
    queryFn: () =>
      getProductsAction({
        limit: DASHBOARD_PRODUCT_LIMIT,
        offset: 0,
      }),
    staleTime: 1000 * 60 * 5,
  });

  const usersQuery = useUsers();

  const products = productsQuery.data?.products ?? [];
  const productCount = productsQuery.data?.count ?? products.length;
  const users = usersQuery.data ?? [];

  const unitsInStock = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0,
  );
  const inventoryValue = products.reduce(
    (sum, product) =>
      sum + Number(product.price || 0) * Number(product.stock || 0),
    0,
  );

  const outOfStock = products.filter(isOutOfStock);
  const lowStock = products.filter(isLowStock);
  const withoutImages = products.filter(
    (product) => (product.images?.length ?? 0) === 0,
  );
  const withoutSizes = products.filter(
    (product) => (product.sizes?.length ?? 0) === 0,
  );
  const restock = [...outOfStock, ...lowStock];

  const collections = [
    {
      gender: "women" as const,
      label: "Mujer",
      count: products.filter((product) => product.gender === "women").length,
      to: "/gender/women",
    },
    {
      gender: "men" as const,
      label: "Hombre",
      count: products.filter((product) => product.gender === "men").length,
      to: "/gender/men",
    },
    {
      gender: "kid" as const,
      label: "Niño",
      count: products.filter((product) => product.gender === "kid").length,
      to: "/gender/kid",
    },
    {
      gender: "unisex" as const,
      label: "Unisex",
      count: products.filter((product) => product.gender === "unisex").length,
      to: "/",
    },
  ];

  const inactiveUsers = users.filter((user: User) => !user.isActive);
  const activeUsers = users.filter((user: User) => user.isActive);

  return {
    products,
    productCount,
    users,
    unitsInStock,
    inventoryValue,
    outOfStock,
    lowStock,
    withoutImages,
    withoutSizes,
    restock,
    collections,
    inactiveUsers,
    activeUsers,
    isPartialCatalog: productCount > products.length,
    isLoading: productsQuery.isLoading || usersQuery.isLoading,
    isError: productsQuery.isError,
  };
};
