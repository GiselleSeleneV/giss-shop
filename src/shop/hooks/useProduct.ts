import { useQuery } from "@tanstack/react-query";
import { getProductAction } from "../actions/getProduct.action";

export const useProduct = (term: string) => {
  return useQuery({
    queryKey: ["product", term],
    queryFn: () => getProductAction(term),
    enabled: !!term,
    staleTime: 1000 * 60 * 5,
  });
};
