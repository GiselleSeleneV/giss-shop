import { AdminTitle } from "@/admin/components/AdminTitle";
import { getInitials, getRoleLabel } from "@/admin/pages/users/user-display";
import { PageEnter } from "@/components/custom/PageEnter";
import { useAuthStore } from "@/auth/store/auth.store";
import { FileText, HelpCircle, Package, Users } from "lucide-react";
import { Link } from "react-router";

const shortcuts = [
  {
    icon: Package,
    label: "Productos",
    description: "Catálogo, precios y fotos.",
    to: "/admin/products",
  },
  {
    icon: Users,
    label: "Usuarios",
    description: "Cuentas, roles y estado.",
    to: "/admin/users",
  },
  {
    icon: FileText,
    label: "Reportes",
    description: "Inventario y cuentas en PDF.",
    to: "/admin/reports",
  },
  {
    icon: HelpCircle,
    label: "Ayuda",
    description: "Guía de uso del proyecto.",
    to: "/admin/ayuda",
  },
];

export const AdminSettingsPage = () => {
  const { user } = useAuthStore();

  return (
    <PageEnter>
      <div className="mb-6 animate-fade-up">
        <AdminTitle
          title="Ajustes"
          description="Sesión del administrador y accesos para configurar la tienda."
        />
      </div>

      <section className="mb-6 overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up">
        <div className="flex items-center gap-3 bg-navy px-4 py-3.5 sm:px-6">
          <span className="h-4 w-px bg-gold" />
          <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
            Cuenta
          </h2>
        </div>
        <div className="flex items-center gap-4 p-4 sm:p-6">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-gold">
            {getInitials(user?.fullName)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-medium text-navy">
              {user?.fullName}
            </p>
            <p className="truncate text-sm text-navy/60">{user?.email}</p>
            <p className="mt-2 text-xs tracking-wide text-navy/50">
              {(user?.roles ?? []).map(getRoleLabel).join(" · ") || "Sin rol"}
              {user ? ` · ${user.isActive ? "Activa" : "Inactiva"}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section
        className="animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <div className="mb-3 flex items-center gap-3">
          <span className="h-4 w-px bg-gold" />
          <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-navy">
            Configuración de la tienda
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-start gap-3 rounded-lg border border-navy/10 bg-white p-4 shadow-sm transition-colors hover:border-gold/40"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#f7f3eb] text-navy">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-navy">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-navy/60">
                    {item.description}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </PageEnter>
  );
};
