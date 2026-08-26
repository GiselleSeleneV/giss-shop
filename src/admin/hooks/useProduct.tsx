import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsByIdAction } from "../actions/getProductsById.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProductAction } from "../actions/createUpdateProduct.action";

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductsByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateProductAction,
    onSuccess: (product: Product) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      const cacheIds = [id, product.id, product.slug].filter(Boolean);
      for (const cacheId of cacheIds) {
        queryClient.setQueryData(["product", { id: cacheId }], product);
      }
    },
  });

  return {
    ...query,
    mutation,
  };
};
