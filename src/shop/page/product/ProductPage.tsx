import { CustomLoading } from "@/components/custom/CustomLoading";
import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import type { Gender, Size } from "@/interfaces/product.interface";
import { ProductGallery } from "@/shop/components/ProductGallery";
import { useProduct } from "@/shop/hooks/useProduct";
import { useCart } from "@/shop/cart/CartContext";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

const genderLabels: Record<Gender, string> = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
  unisex: "Unisex",
};

export const ProductPage = () => {
  const { idSlug = "" } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(idSlug);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | "">("");

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  useEffect(() => {
    setSelectedSize("");
  }, [idSlug]);

  if (isLoading) {
    return <CustomLoading message="Cargando producto" />;
  }

  if (isError || !product) {
    return (
      <PageEnter>
        <section className="container mx-auto px-4 lg:px-8 py-24 text-center">
          <button
            type="button"
            onClick={goBack}
            className="mb-8 inline-flex items-center gap-2 text-sm text-gold hover:text-navy transition-colors"
          >
            <ArrowLeft className="size-4" />
            Volver
          </button>
          <div className="mx-auto mb-4 h-px w-14 bg-gold" />
          <h1 className="font-montserrat text-3xl font-light tracking-tight text-navy mb-3">
            Producto no encontrado
          </h1>
          <p className="text-muted-foreground mb-8">
            No pudimos cargar esta pieza. Vuelve al catálogo e inténtalo de
            nuevo.
          </p>
          <Link to="/">
            <Button className="bg-navy text-gold hover:bg-navy/90">
              Volver a la tienda
            </Button>
          </Link>
        </section>
      </PageEnter>
    );
  }

  const tags = Array.isArray(product.tags) ? product.tags : [product.tags];
  const outOfStock = product.stock <= 0;
  const canAddToCart = !outOfStock && !!selectedSize;

  return (
    <PageEnter>
      <section className="bg-navy">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="animate-fade-up flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] tracking-[0.16em] uppercase text-white/60">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 text-gold hover:text-white transition-colors"
              aria-label="Volver a la página anterior"
            >
              <ArrowLeft className="size-4" />
              <span>Volver</span>
            </button>
            <span className="text-white/30">|</span>
            <Link to="/" className="hover:text-gold transition-colors">
              Tienda
            </Link>
            <span className="text-gold">/</span>
            <Link
              to={`/gender/${product.gender}`}
              className="hover:text-gold transition-colors"
            >
              {genderLabels[product.gender] ?? product.gender}
            </Link>
            <span className="text-gold">/</span>
            <span className="text-gold truncate max-w-[140px] sm:max-w-[240px]">
              {product.title}
            </span>
          </nav>
        </div>
      </section>

      <section className="py-6 sm:py-10 px-4 lg:px-8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="animate-fade-up min-w-0">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div
            className="animate-fade-up min-w-0 space-y-8"
            style={{ animationDelay: "120ms" }}
          >
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-gold mb-3">
                {genderLabels[product.gender] ?? product.gender}
              </p>
              <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-navy mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-medium text-gold">${product.price}</p>
            </div>

            {tags.filter(Boolean).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.filter(Boolean).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-[#f7f3eb] text-[11px] tracking-[0.14em] uppercase text-navy"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <p className="text-sm leading-relaxed text-navy/70">
              {product.description}
            </p>

            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-navy mb-3">
                Talla
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "min-w-12 px-3 py-2 rounded-md text-sm font-medium border transition-all duration-200",
                      selectedSize === size
                        ? "bg-navy text-gold border-navy"
                        : "border-navy/20 text-navy hover:bg-navy hover:text-gold hover:border-navy",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-y border-navy/10">
              <span className="text-xs tracking-[0.14em] uppercase text-navy/60">
                Disponibilidad
              </span>
              <span
                className={cn(
                  "text-xs tracking-[0.14em] uppercase font-medium",
                  outOfStock ? "text-navy/40" : "text-gold",
                )}
              >
                {outOfStock
                  ? "Agotado"
                  : `${product.stock} ${product.stock === 1 ? "unidad" : "unidades"}`}
              </span>
            </div>

            <Button
              size="lg"
              disabled={!canAddToCart}
              className="w-full h-11 bg-navy text-gold hover:bg-navy/90 disabled:opacity-40"
              onClick={() => {
                if (!selectedSize) return;
                addItem({
                  id: product.id,
                  slug: product.slug,
                  title: product.title,
                  price: product.price,
                  image: product.images[0] || "",
                  size: selectedSize,
                });
              }}
            >
              {outOfStock
                ? "Agotado"
                : selectedSize
                  ? "Agregar al carrito"
                  : "Selecciona una talla"}
            </Button>
          </div>
        </div>
      </section>
    </PageEnter>
  );
};
