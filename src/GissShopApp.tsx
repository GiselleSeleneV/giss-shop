import { RouterProvider } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "./appRouter";
import { CartProvider } from "./shop/cart/CartContext";
import { Toaster } from "sonner";
import { CustomLoading } from "./components/custom/CustomLoading";
import { useAuthStore } from "./auth/store/auth.store";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <CustomLoading />;
  }

  return children;
};

export const GissShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <CheckAuthProvider>
        <CartProvider>
          <RouterProvider router={AppRouter} />
          <ReactQueryDevtools initialIsOpen={false} />
        </CartProvider>
      </CheckAuthProvider>
    </QueryClientProvider>
  );
};
