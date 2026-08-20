import type { Size } from "@/interfaces/product.interface";

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size: Size;
  quantity: number;
}

export interface AddToCartInput {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size: Size;
}
