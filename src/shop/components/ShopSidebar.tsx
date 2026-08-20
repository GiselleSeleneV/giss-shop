import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { cn } from "@/lib/utils";
import {
  Baby,
  LayoutGrid,
  HelpCircle,
  LogIn,
  Search,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router";

interface ShopSidebarProps {
  open: boolean;
  onClose: () => void;
  gender?: string;
  query: string;
  onSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const menuItems = [
  {
    icon: LayoutGrid,
    label: "Todos los productos",
    to: "/",
    gender: undefined,
  },
  { icon: User, label: "Hombres", to: "/gender/men", gender: "men" },
  { icon: Users, label: "Mujeres", to: "/gender/women", gender: "women" },
  { icon: Baby, label: "Niños", to: "/gender/kid", gender: "kid" },
];

export const ShopSidebar = ({
  open,
  onClose,
  gender,
  query,
  onSearch,
}: ShopSidebarProps) => {
  const { pathname } = useLocation();
  const isActive = (itemGender?: string) =>
    itemGender ? gender === itemGender : pathname === "/";

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-navy/50 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        aria-label="Cerrar menú"
      />

      <aside
        className={cn(
          "absolute left-0 top-0 flex h-full w-[min(18rem,88vw)] flex-col bg-navy text-white shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
          <CustomLogo inverted />
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-gold transition-colors hover:bg-white/10"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        <div className="border-b border-white/10 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <Input
              placeholder="Buscar productos..."
              className="h-9 pl-9 bg-white/5 border-white/15 text-white placeholder:text-white/40 focus-visible:border-gold"
              onKeyDown={(event) => {
                onSearch(event);
                if (event.key === "Enter") onClose();
              }}
              defaultValue={query}
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.gender);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-all duration-200",
                      active
                        ? "bg-white/10 text-gold"
                        : "text-white/65 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "h-4 w-px shrink-0",
                        active ? "bg-gold" : "bg-transparent",
                      )}
                    />
                    <Icon size={18} className="shrink-0" />
                    <span className="font-medium tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-2 border-t border-white/10 p-4">
          <Link to="/auth/login" onClick={onClose}>
            <Button className="w-full h-9 bg-gold text-navy hover:bg-gold/90 mb-2">
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </Button>
          </Link>
          <Link to="/ayuda" onClick={onClose}>
            <Button
              variant="outline"
              className="w-full h-9 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-gold mb-2"
            >
              <HelpCircle className="h-4 w-4" />
              Ayuda
            </Button>
          </Link>
          <Link to="/admin" onClick={onClose}>
            <Button
              variant="outline"
              className="w-full h-9 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-gold"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Button>
          </Link>
        </div>
      </aside>
    </div>
  );
};
