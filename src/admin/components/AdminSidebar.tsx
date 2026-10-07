import React from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/auth/store/auth.store";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const getInitials = (fullName?: string) => {
  if (!fullName?.trim()) return "";

  const [first, second] = fullName.trim().split(/\s+/);
  return `${first.charAt(0)}${second?.charAt(0) ?? ""}`.toUpperCase();
};

export const AdminSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}) => {
  const { pathname } = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { icon: Home, label: "Panel de control", to: "/admin" },
    { icon: BarChart3, label: "Productos", to: "/admin/products" },
    { icon: Users, label: "Usuarios", to: "/admin/users" },
    { icon: FileText, label: "Reportes", to: "/admin/reports" },
    { icon: Settings, label: "Ajustes" },
    { icon: HelpCircle, label: "Ayuda", to: "/admin/ayuda" },
  ];

  const isActiveRoute = (to: string) => {
    if (pathname.includes("/admin/product/") && to === "/admin/products") {
      return true;
    }
    if (pathname.includes("/admin/user/") && to === "/admin/users") {
      return true;
    }
    return pathname === to;
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(18rem,88vw)] shrink-0 flex-col overflow-hidden bg-navy text-white transition-all duration-300 ease-in-out lg:static lg:z-auto lg:h-full",
        isCollapsed ? "lg:w-24" : "lg:w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-3">
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

      <nav className="min-h-0 flex-1 overflow-y-auto p-3">
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

      <div className="shrink-0 border-t border-white/10 p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-md p-2",
            isCollapsed && "lg:justify-center",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-semibold text-navy">
            {getInitials(user?.fullName)}
          </div>
          <div className={cn("min-w-0 flex-1", isCollapsed && "lg:hidden")}>
            <p className="truncate text-sm font-medium text-white">
              {user?.fullName}
            </p>
            <p className="truncate text-xs text-white/50">{user?.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onMobileClose();
            logout();
          }}
          className={cn(
            "mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
            "text-white/55 hover:bg-red-500/15 hover:text-red-300",
            isCollapsed && "lg:justify-center lg:px-2",
          )}
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} className="shrink-0" />
          <span
            className={cn(
              "font-medium tracking-wide",
              isCollapsed && "lg:hidden",
            )}
          >
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>
  );
};
