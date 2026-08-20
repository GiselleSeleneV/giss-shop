import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Size } from "@/interfaces/product.interface";
import { useCart } from "@/shop/cart/CartContext";
import { Link } from "react-router";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes: Size[];
  index?: number;
}
export const ProductCard = ({
  id,
  slug,
  name,
  price,
  image,
  category,
  sizes,
  index = 0,
}: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <Link to={`/product/${slug}`} className="block">
      <Card
        className="group border-0 shadow-none ring-0 product-card-hover cursor-pointer bg-transparent animate-fade-up"
        style={{ animationDelay: `${Math.min(index, 9) * 70}ms` }}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted rounded-sm ring-1 ring-gold/15">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="image-overlay" />
          </div>

          <div className="pt-5 px-1 pb-2 space-y-3">
            <div className="space-y-1">
              <h3 className="font-medium text-sm tracking-tight text-navy">
                {name}
              </h3>
              <p className="text-[11px] text-muted-foreground uppercase tracking-[0.14em] truncate">
                {category} · {sizes.join(" · ")}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-lg text-gold">${price}</p>
              <Button
                size="sm"
                variant="outline"
                className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 border-gold/40 text-navy hover:bg-gold hover:text-navy text-[10px] min-[400px]:text-xs px-2 min-[400px]:px-3 sm:px-4 py-2 h-8 shrink-0"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (!sizes[0]) return;
                  addItem({
                    id,
                    slug,
                    title: name,
                    price,
                    image,
                    size: sizes[0],
                  });
                }}
              >
                <span className="sm:hidden">Añadir</span>
                <span className="hidden sm:inline">Agregar al carrito</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
