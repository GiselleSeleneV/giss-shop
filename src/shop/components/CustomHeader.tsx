import { LogIn, Menu, Search, Shield, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { useCart } from "@/shop/cart/CartContext";
import { ShopSidebar } from "./ShopSidebar";

export const CustomHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { gender } = useParams();
  const { pathname } = useLocation();
  const { openCart, totalItems } = useCart();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const query = searchParams.get("query") || "";

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const query = e.currentTarget.value || "";

    const newSearchParams = new URLSearchParams();

    if (!query) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", query);
    }

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const navLinkClass = (isActive: boolean) =>
    cn(
      "relative text-sm tracking-[0.12em] uppercase transition-colors hover:text-gold",
      isActive ? "text-navy" : "text-navy/70",
      isActive &&
        "after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-gold",
    );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gold/25 bg-white/90 backdrop-blur-md animate-fade-down">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <CustomLogo />
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={navLinkClass(pathname === "/")}>
                Todos los productos
              </Link>
              <Link to="/gender/men" className={navLinkClass(gender === "men")}>
                Hombres
              </Link>
              <Link
                to="/gender/women"
                className={navLinkClass(gender === "women")}
              >
                Mujeres
              </Link>
              <Link to="/gender/kid" className={navLinkClass(gender === "kid")}>
                Niños
              </Link>
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3">
              <div className="hidden lg:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <Input
                    placeholder="Buscar productos..."
                    className="pl-9 w-40 xl:w-56 h-8 bg-white border-gold/30 focus-visible:border-gold"
                    onKeyDown={handleSearch}
                    defaultValue={query}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
                aria-label="Abrir carrito"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 ? (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-navy px-1 text-[10px] font-medium text-gold">
                    {totalItems}
                  </span>
                ) : null}
              </Button>

              <Link to="/auth/login" className="hidden lg:inline-flex">
                <Button
                  size="sm"
                  className="ml-2 h-8 px-3 tracking-wide bg-navy text-gold hover:bg-navy/90"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar sesión
                </Button>
              </Link>

              <Link to="/admin" className="hidden lg:inline-flex">
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 h-8 px-3 border-navy/20 text-navy hover:bg-navy hover:text-white"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <ShopSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        gender={gender}
        query={query}
        onSearch={handleSearch}
      />
    </>
  );
};
