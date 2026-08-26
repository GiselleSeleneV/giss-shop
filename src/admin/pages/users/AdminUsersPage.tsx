import { AdminTitle } from "@/admin/components/AdminTitle";
import { useUsers } from "@/admin/hooks/useUsers";
import {
  getInitials,
  getRoleLabel,
} from "@/admin/pages/users/user-display";
import { CustomLoading } from "@/components/custom/CustomLoading";
import { PageEnter } from "@/components/custom/PageEnter";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Link } from "react-router";

export const AdminUsersPage = () => {
  const { data: users = [], isLoading, isError } = useUsers();

  return (
    <PageEnter>
      <div className="mb-6 animate-fade-up">
        <AdminTitle
          title="Usuarios"
          description="Aquí puedes ver y administrar los usuarios del panel."
        />
      </div>

      <div
        className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm mb-8 animate-fade-up"
        style={{ animationDelay: "80ms" }}
      >
        <div className="flex items-center justify-between gap-3 bg-navy px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <span className="h-4 w-px bg-gold" />
            <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
              Directorio
            </h2>
          </div>
          <span className="text-[11px] tracking-[0.16em] uppercase text-gold">
            {users.length} usuarios
          </span>
        </div>

        {isLoading ? (
          <CustomLoading message="Cargando usuarios" />
        ) : isError ? (
          <p className="px-6 py-12 text-center text-sm text-destructive">
            No se pudieron cargar los usuarios. Comprueba que tu sesión sea de
            administrador.
          </p>
        ) : users.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-navy/50">
            No hay usuarios para mostrar.
          </p>
        ) : (
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="border-navy/10 hover:bg-transparent">
                <TableHead className="px-4 py-3 text-[11px] tracking-[0.14em] uppercase text-navy/60">
                  Usuario
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] tracking-[0.14em] uppercase text-navy/60">
                  Email
                </TableHead>
                <TableHead className="px-4 py-3 text-[11px] tracking-[0.14em] uppercase text-navy/60">
                  Roles
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                  Estado
                </TableHead>
                <TableHead className="px-4 py-3 text-right text-[11px] tracking-[0.14em] uppercase text-navy/60">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-semibold tracking-wide text-gold">
                        {getInitials(user.fullName)}
                      </div>
                      <span className="font-medium text-navy">
                        {user.fullName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-navy/80">
                    {user.email}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className={cn(
                            "inline-flex rounded-md px-2.5 py-1 text-[11px] tracking-wide uppercase",
                            role === "admin"
                              ? "bg-navy text-gold"
                              : role === "super-user"
                                ? "bg-gold/20 text-navy"
                                : "bg-navy/5 text-navy",
                          )}
                        >
                          {getRoleLabel(role)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <span
                      className={cn(
                        "inline-flex rounded-md px-2.5 py-1 text-[11px] tracking-wide uppercase",
                        user.isActive
                          ? "bg-navy text-gold"
                          : "bg-destructive/10 text-destructive",
                      )}
                    >
                      {user.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <Link
                      to={`/admin/user/${user.id}`}
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
        )}
      </div>
    </PageEnter>
  );
};
