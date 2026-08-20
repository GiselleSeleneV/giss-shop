import { Button } from "@/components/ui/button";
import { useCart } from "@/shop/cart/CartContext";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { DemoCheckoutModal } from "./DemoCheckoutModal";

export const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handlePay = () => {
    setShowDemoModal(true);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
            onClick={closeCart}
            aria-label="Cerrar carrito"
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-fade-up pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] sm:w-[min(28rem,100%)]">
            <div className="flex items-center justify-between bg-navy px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="h-4 w-px bg-gold" />
                <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
                  Carrito
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-md p-1 text-gold hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="mb-4 size-10 text-gold" />
                  <p className="font-montserrat text-sm tracking-[0.16em] uppercase text-navy">
                    Tu carrito está vacío
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Añade una pieza para verla aquí.
                  </p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 border-b border-navy/10 pb-5"
                    >
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="size-20 shrink-0 overflow-hidden rounded-sm ring-1 ring-navy/10"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="text-sm font-medium text-navy hover:text-gold"
                          >
                            {item.title}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.size)}
                            className="text-navy/40 hover:text-navy"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                          Talla {item.size}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center border border-navy/15 rounded-md">
                            <button
                              type="button"
                              className="px-2 py-1 text-navy hover:bg-[#f7f3eb]"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="px-2 py-1 text-navy hover:bg-[#f7f3eb]"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.size,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-gold">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 ? (
              <div className="border-t border-navy/10 px-5 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.16em] uppercase text-navy/60">
                    Total · {totalItems} {totalItems === 1 ? "pieza" : "piezas"}
                  </span>
                  <span className="text-lg font-semibold text-navy">
                    ${totalPrice}
                  </span>
                </div>
                <Button
                  className="w-full h-11 bg-navy text-gold hover:bg-navy/90"
                  onClick={handlePay}
                >
                  Pagar
                </Button>
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}

      <DemoCheckoutModal
        open={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </>
  );
};
