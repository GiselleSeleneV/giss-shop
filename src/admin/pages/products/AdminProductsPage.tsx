import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {
  return (
    <PageEnter>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6 animate-fade-up">
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

      <div className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm mb-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center justify-between gap-3 bg-navy px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <span className="h-4 w-px bg-gold" />
            <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
              Inventario
            </h2>
          </div>
          <span className="text-[11px] tracking-[0.16em] uppercase text-gold">
            1 producto
          </span>
        </div>

        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow className="border-navy/10 hover:bg-transparent">
              <TableHead className="w-[80px] px-4 py-3 text-[11px] tracking-[0.14em] uppercase text-navy/60">
                Id
              </TableHead>
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
            <TableRow className="border-navy/10 hover:bg-navy/[0.03]">
              <TableCell className="px-4 py-4 font-medium text-navy/50">
                1
              </TableCell>
              <TableCell className="px-4 py-4">
                <div className="size-16 overflow-hidden rounded-md border border-navy/10 bg-[#f7f3eb]">
                  <img
                    src="https://placehold.co/250x250"
                    alt="Producto"
                    className="h-full w-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="px-4 py-4 font-medium text-navy">
                Producto 1
              </TableCell>
              <TableCell className="px-4 py-4 text-right font-semibold text-navy">
                $250.000
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <span className="inline-flex rounded-md bg-navy px-2.5 py-1 text-[11px] tracking-wide uppercase text-gold">
                  Categoria 1
                </span>
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <span className="inline-flex rounded-md bg-navy/5 px-2.5 py-1 text-[11px] tracking-wide uppercase text-navy">
                  100 stock
                </span>
              </TableCell>
              <TableCell className="px-4 py-4 text-right">
                <div className="flex flex-wrap justify-end gap-1">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
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
                <Link to="/admin/product/t-shirt-teslo">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-navy/20 text-navy hover:bg-navy hover:text-gold"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Editar
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <CustomPagination totalPages={10} />
    </PageEnter>
  );
};
