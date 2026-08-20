import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "./appRouter";
import { CartProvider } from "./shop/cart/CartContext";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const GissShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CartProvider>
        <RouterProvider router={AppRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </CartProvider>
    </QueryClientProvider>
  );
};
