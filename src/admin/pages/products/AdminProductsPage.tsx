import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { PageEnter } from "@/components/custom/PageEnter";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cn } from "@/lib/utils";
import { useProducts } from "@/shop/hooks/useProducts";
import { Pencil, PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  return (
    <PageEnter>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between animate-fade-up">
        <AdminTitle
          title="Productos"
          description="Aqui puedes ver y administrar tus productos"
        />

        <Link to="/admin/product/new" className="shrink-0">
          <Button className="bg-navy text-gold hover:bg-navy/90">
            <PlusIcon className="w-4 h-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      <div
        className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm mb-8 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex items-center justify-between gap-3 bg-navy px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <span className="h-4 w-px bg-gold" />
            <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
              Inventario
            </h2>
          </div>
          <span className="text-[11px] tracking-[0.16em] uppercase text-gold">
            {data?.products.length} productos
          </span>
        </div>

        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="border-navy/10 hover:bg-transparent">
              <TableHead className="px-4 py-3 text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Imagen
              </TableHead>
              <TableHead className="px-4 py-3 text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Nombre
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Precio
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Categoría
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Inventario
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Tallas
              </TableHead>
              <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="size-16 overflow-hidden rounded-md border border-navy/10 bg-[#f7f3eb]">
                    <img
                      src={product.images[0] || ""}
                      alt="Producto"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 font-medium text-navy">
                  {product.title}
                </TableCell>
                <TableCell className="px-4 py-4 text-right font-semibold text-navy">
                  {currencyFormatter(product.price)}
                </TableCell>
                <TableCell className="px-4 py-4 text-right">
                  <span className="inline-flex rounded-md bg-navy px-2.5 py-1 text-[11px] tracking-wide uppercase text-gold">
                    {product.gender}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-right">
                  <span className="inline-flex rounded-md bg-navy/5 px-2.5 py-1 text-[11px] tracking-wide uppercase text-navy">
                    {product.stock} stock
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-right">
                  <div className="flex flex-wrap justify-end gap-1">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex min-w-8 justify-center rounded-md bg-navy px-1.5 py-0.5 text-[10px] font-medium text-gold"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4 text-right">
                  <Link
                    to={`/admin/product/${product.slug || product.id}`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "border-navy/20 text-navy hover:bg-navy hover:text-gold",
                    )}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CustomPagination totalPages={data?.pages || 0} />
    </PageEnter>
  );
};
