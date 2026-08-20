import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../actions/getProducts.actions";
import { useParams, useSearchParams } from "react-router";

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams();

  const querry = searchParams.get("query") || "";
  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;
  const sizes = searchParams.get("sizes") || "";
  const price = searchParams.get("price") || "";

  const offset = (Number(page) - 1) * Number(limit);

  let minPrice = undefined;
  let maxPrice = undefined;

  switch (price) {
    case "0-50":
      minPrice = 0;
      maxPrice = 50;
      break;
    case "50-100":
      minPrice = 50;
      maxPrice = 100;
      break;
    case "100-200":
      minPrice = 100;
      maxPrice = 200;
      break;
    case "200+":
      minPrice = 200;
      maxPrice = undefined;
      break;
    case "any":
    default:
      break;
  }

  return useQuery({
    queryKey: [
      "products",
      { offset, limit, sizes, gender, minPrice, maxPrice, querry },
    ],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : Number(limit),
        offset: isNaN(offset) ? 0 : offset,
        sizes,
        gender,
        minPrice,
        maxPrice,
        querry,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes fresca en cache y no haga la peticion nuevamente
  });
};
