import { AdminTitle } from "@/admin/components/AdminTitle";
import { useAdminDashboard } from "@/admin/hooks/useAdminDashboard";
import { CustomLoading } from "@/components/custom/CustomLoading";
import { PageEnter } from "@/components/custom/PageEnter";
import { buttonVariants } from "@/components/ui/button";
import { useAuthStore } from "@/auth/store/auth.store";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cn } from "@/lib/utils";
import type { Product } from "@/interfaces/product.interface";
import {
  AlertTriangle,
  Banknote,
  ImageOff,
  Package,
  Pencil,
  Plus,
  Ruler,
  Shirt,
  Store,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

const Panel = ({
  title,
  count,
  delay,
  children,
}: {
  title: string;
  count?: string;
  delay?: string;
  children: ReactNode;
}) => (
  <section
    className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center justify-between gap-3 bg-navy px-4 sm:px-5 py-3.5">
      <div className="flex items-center gap-3">
        <span className="h-4 w-px bg-gold" />
        <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
          {title}
        </h2>
      </div>
      {count ? (
        <span className="text-[11px] tracking-[0.16em] uppercase text-gold">
          {count}
        </span>
      ) : null}
    </div>
    <div className="p-4 sm:p-5">{children}</div>
  </section>
);

const ProductRow = ({ product }: { product: Product }) => {
  const stock = Number(product.stock || 0);
  const out = stock <= 0;

  return (
    <Link
      to={`/admin/product/${product.slug || product.id}`}
      className="flex items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-[#f7f3eb]"
    >
      <div className="size-12 shrink-0 overflow-hidden rounded-md border border-navy/10 bg-[#f7f3eb]">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-navy/30">
            <Shirt className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-navy">
          {product.title}
        </p>
        <p className="text-[11px] tracking-wide text-navy/45">
          {currencyFormatter(product.price)}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-md px-2 py-1 text-[10px] tracking-wide uppercase",
          out ? "bg-destructive/10 text-destructive" : "bg-gold/20 text-navy",
        )}
      >
        {out ? "Sin stock" : `${stock} uds`}
      </span>
      <Pencil className="h-3.5 w-3.5 shrink-0 text-navy/30" />
    </Link>
  );
};

export const DashboardPage = () => {
  const { user } = useAuthStore();
  const {
    productCount,
    unitsInStock,
    inventoryValue,
    outOfStock,
    lowStock,
    withoutImages,
    withoutSizes,
    restock,
    collections,
    users,
    activeUsers,
    inactiveUsers,
    isPartialCatalog,
    products,
    isLoading,
    isError,
  } = useAdminDashboard();

  const firstName = user?.fullName?.trim().split(/\s+/)[0] ?? "";
  const maxCollection = Math.max(...collections.map((item) => item.count), 1);
  const attentionCount =
    outOfStock.length +
    lowStock.length +
    withoutImages.length +
    withoutSizes.length +
    inactiveUsers.length;

  if (isLoading) {
    return <CustomLoading message="Cargando la tienda" />;
  }

  if (isError) {
    return (
      <PageEnter>
        <AdminTitle
          title="Panel de control"
          description="No se pudo cargar el catálogo. Inténtalo de nuevo."
        />
      </PageEnter>
    );
  }

  return (
    <PageEnter>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-fade-up">
        <div className="animate-fade-up">
          <AdminTitle
            title={firstName ? `Hola, ${firstName}` : "Panel de control"}
            description="Resumen del catálogo y el inventario de Giss | Shop. Desde aquí puedes reponer prendas, completar fichas y entrar a la tienda."
          />
        </div>

        <div
          className="flex shrink-0 flex-wrap gap-2 animate-fade-up"
          style={{ animationDelay: "80ms" }}
        >
          <Link
            to="/admin/product/new"
            className={cn(
              buttonVariants({ size: "sm" }),
              "bg-navy text-gold hover:bg-navy/90",
            )}
          >
            <Plus className="h-4 w-4" />
            Nuevp producto
          </Link>
          <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-navy/20 text-navy hover:bg-navy hover:text-gold",
            )}
          >
            <Store className="h-4 w-4" />
            Ver tienda
          </Link>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Prendas en catálogo",
            value: String(productCount),
            hint: isPartialCatalog
              ? `Detalle de ${products.length}`
              : "Fichas publicadas",
            to: "/admin/products",
            icon: Shirt,
          },
          {
            label: "Unidades en stock",
            value: String(unitsInStock),
            hint: outOfStock.length
              ? `${outOfStock.length} sin stock`
              : "Listas para vender",
            to: "/admin/products",
            icon: Package,
          },
          {
            label: "Valor del inventario",
            value: currencyFormatter(inventoryValue),
            hint: "Precio × unidades, no ventas",
            to: "/admin/products",
            icon: Banknote,
          },
          {
            label: "Usuarios",
            value: String(users.length),
            hint: `${activeUsers.length} activos`,
            to: "/admin/users",
            icon: Users,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              to={stat.to}
              className="rounded-lg border border-navy/10 bg-white p-4 shadow-sm transition-shadow hover:shadow-md animate-fade-up"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                  {stat.label}
                </p>
                <span className="rounded-md bg-navy p-2 text-gold">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <p className="truncate font-montserrat text-2xl font-light text-navy">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-navy/45">{stat.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel
            title="Reponer inventario"
            count={restock.length ? `${restock.length} prendas` : "Al día"}
            delay="120ms"
          >
            {restock.length === 0 ? (
              <p className="py-6 text-center text-sm text-navy/45">
                No hay prendas agotadas ni con stock bajo.
              </p>
            ) : (
              <div className="divide-y divide-navy/5">
                {restock.slice(0, 8).map((product) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </div>
            )}
            {restock.length > 8 ? (
              <Link
                to="/admin/products"
                className="mt-3 block text-center text-[11px] tracking-[0.14em] uppercase text-gold hover:text-navy"
              >
                Ver inventario completo
              </Link>
            ) : null}
          </Panel>
        </div>

        <Panel
          title="Atención"
          count={attentionCount ? `${attentionCount}` : "0"}
          delay="180ms"
        >
          <div className="space-y-2">
            {[
              {
                icon: AlertTriangle,
                label: "Sin stock",
                count: outOfStock.length,
                tone: "danger" as const,
              },
              {
                icon: Package,
                label: "Stock bajo",
                count: lowStock.length,
                tone: "warn" as const,
              },
              {
                icon: ImageOff,
                label: "Sin fotos",
                count: withoutImages.length,
                tone: "warn" as const,
              },
              {
                icon: Ruler,
                label: "Sin tallas",
                count: withoutSizes.length,
                tone: "warn" as const,
              },
              {
                icon: Users,
                label: "Cuentas inactivas",
                count: inactiveUsers.length,
                tone: "neutral" as const,
                to: "/admin/users",
              },
            ].map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span
                    className={cn(
                      "rounded-md p-2",
                      item.count === 0
                        ? "bg-navy/5 text-navy/35"
                        : item.tone === "danger"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-gold/20 text-navy",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm text-navy">{item.label}</span>
                  <span className="text-sm font-medium text-navy">
                    {item.count}
                  </span>
                </>
              );

              return item.to ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-3 rounded-lg bg-[#f7f3eb] px-3 py-2.5 transition-colors hover:bg-gold/15"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg bg-[#f7f3eb] px-3 py-2.5"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title="Colecciones" delay="220ms">
            {products.length === 0 ? (
              <p className="py-6 text-center text-sm text-navy/45">
                Aún no hay prendas. Crea la primera para armar el catálogo.
              </p>
            ) : (
              <div className="space-y-4">
                {collections.map((collection) => (
                  <Link
                    key={collection.gender}
                    to={collection.to}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <span className="w-16 shrink-0 text-[11px] tracking-[0.12em] uppercase text-navy/50">
                      {collection.label}
                    </span>
                    <div className="min-w-0 flex-1 rounded-full bg-[#f7f3eb] h-3">
                      <div
                        className="h-3 rounded-full bg-gold transition-all duration-700"
                        style={{
                          width: `${(collection.count / maxCollection) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm text-navy">
                      {collection.count}
                    </span>
                  </Link>
                ))}
                <p className="pt-1 text-[11px] text-navy/40">
                  Toca una colección para verla como la ve el cliente.
                </p>
              </div>
            )}
          </Panel>
        </div>

        <Panel title="Atajos" delay="260ms">
          <div className="grid grid-cols-1 gap-2">
            {[
              {
                to: "/admin/product/new",
                icon: Plus,
                label: "Nuevo Producto",
                hint: "Sumar una ficha al catálogo",
              },
              {
                to: "/admin/products",
                icon: Shirt,
                label: "Inventario",
                hint: "Precios, stock y tallas",
              },
              {
                to: "/admin/users",
                icon: Users,
                label: "Usuarios",
                hint: "Roles y cuentas activas",
              },
              {
                to: "/",
                icon: Store,
                label: "Tienda",
                hint: "Ver el escaparate público",
              },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className="flex items-center gap-3 rounded-lg bg-[#f7f3eb] px-3 py-3 transition-colors hover:bg-gold/15"
                >
                  <span className="rounded-md bg-navy p-2 text-gold">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-navy">
                      {action.label}
                    </span>
                    <span className="block text-[11px] text-navy/45">
                      {action.hint}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Panel>
      </div>

      {withoutImages.length > 0 ? (
        <div className="mt-6">
          <Panel
            title="Fichas sin fotos"
            count={`${withoutImages.length}`}
            delay="300ms"
          >
            <div className="divide-y divide-navy/5">
              {withoutImages.slice(0, 6).map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          </Panel>
        </div>
      ) : null}
    </PageEnter>
  );
};
