import React from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  ShoppingCart,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}) => {
  const { pathname } = useLocation();

  const menuItems = [
    { icon: Home, label: "Panel de control", to: "/admin" },
    { icon: BarChart3, label: "Productos", to: "/admin/products" },
    { icon: Users, label: "Usuarios", to: "/admin/users" },
    { icon: ShoppingCart, label: "Ordenes" },
    { icon: FileText, label: "Reportes" },
    { icon: Bell, label: "Notificaciones" },
    { icon: Settings, label: "Ajustes" },
    { icon: HelpCircle, label: "Ayuda", to: "/ayuda" },
  ];

  const isActiveRoute = (to: string) => {
    if (pathname.includes("/admin/product/") && to === "/admin/products") {
      return true;
    }
    return pathname === to;
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-full min-h-screen w-[min(18rem,88vw)] flex-col bg-navy text-white transition-all duration-300 ease-in-out lg:static lg:z-auto",
        isCollapsed ? "lg:w-24" : "lg:w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-3">
        <div className={cn(isCollapsed && "lg:hidden")}>
          <CustomLogo inverted />
        </div>
        <button
          type="button"
          onClick={onMobileClose}
          className="rounded-md p-1.5 text-gold transition-colors hover:bg-white/10 lg:hidden"
          aria-label="Cerrar menú"
        >
          <X size={18} />
        </button>
        <button
          type="button"
          onClick={onToggle}
          className="hidden rounded-md p-1.5 text-gold transition-colors hover:bg-white/10 lg:flex"
        >
          {isCollapsed ? (
            <div className="flex items-center gap-1">
              <CustomLogo inverted title="G" subtitle="S" />
              <ChevronRight size={18} />
            </div>
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActiveRoute(item.to || "/xxx");

            return (
              <li key={index}>
                <Link
                  to={item.to || "/admin"}
                  onClick={onMobileClose}
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
                  <span
                    className={cn(
                      "font-medium tracking-wide",
                      isCollapsed && "lg:hidden",
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "border-t border-white/10 p-4",
          isCollapsed && "lg:hidden",
        )}
      >
          <div className="flex cursor-pointer items-center gap-3 rounded-md p-3 transition-colors hover:bg-white/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-sm font-semibold text-navy">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                John Doe
              </p>
              <p className="truncate text-xs text-white/50">
                john@company.com
              </p>
            </div>
          </div>
      </div>
    </aside>
  );
};
