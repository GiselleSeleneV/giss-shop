import { useAuthStore } from "@/auth/store/auth.store";
import { Search, Settings, Menu } from "lucide-react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export const AdminHeader = ({ onMenuClick }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const query = e.currentTarget.value.trim();

    if (!query) {
      navigate(`/admin/products`);
      return;
    }

    navigate(`/admin/products?query=${query}`);
  };

  return (
    <header className="z-30 shrink-0 border-b border-gold/20 bg-white/95 backdrop-blur-md">
      <div className="flex flex-col gap-2 px-3 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-0 lg:px-6">
        <div className="flex min-w-0 items-center justify-between gap-2 sm:contents">
          <button
            type="button"
            className="shrink-0 rounded-lg p-2 text-navy hover:bg-[#f7f3eb] lg:hidden"
            onClick={onMenuClick}
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <div className="relative order-last hidden min-w-0 w-full sm:order-none sm:block sm:max-w-md sm:flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-gold"
              size={18}
            />
            <input
              ref={inputRef}
              onKeyDown={handleSearch}
              type="search"
              placeholder="Buscar productos..."
              className="h-9 w-full min-w-0 rounded-lg border border-gold/30 bg-white py-2 pr-3 pl-10 text-sm outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/40 sm:h-10"
            />
          </div>

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => navigate("/admin/ajustes")}
              className={cn(
                "cursor-pointer rounded-lg p-2 transition-colors hover:bg-[#f7f3eb]",
                pathname === "/admin/ajustes"
                  ? "text-gold"
                  : "text-navy/70",
              )}
              aria-label="Ajustes"
              aria-current={pathname === "/admin/ajustes" ? "page" : undefined}
            >
              <Settings size={20} />
            </button>

            <div
              className="ml-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-navy text-sm font-semibold text-gold transition-shadow hover:shadow-lg"
              title={user?.fullName}
            >
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="relative min-w-0 sm:hidden">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-gold"
            size={18}
          />
          <input
            onKeyDown={handleSearch}
            type="search"
            placeholder="Buscar..."
            className="h-9 w-full min-w-0 rounded-lg border border-gold/30 bg-white py-2 pr-3 pl-10 text-sm outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/40"
          />
        </div>
      </div>
    </header>
  );
};
