import { AdminTitle } from "@/admin/components/AdminTitle";
import {
  buildUserPatch,
  type UpdateUserPayload,
} from "@/admin/actions/updateUser.action";
import {
  AVAILABLE_ROLES,
  getInitials,
  getRoleLabel,
} from "@/admin/pages/users/user-display";
import { PasswordRequirements } from "@/auth/components/PasswordRequirements";
import {
  isEmailValid,
  isFullNameValid,
  isPasswordValid,
} from "@/auth/helpers/auth-validation";
import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import type { User, UserRole } from "@/interfaces/user.interface";
import { cn } from "@/lib/utils";
import { SaveAll, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface FormInputs {
  email: string;
  fullName: string;
  password: string;
}

interface Props {
  user: User;
  isPending: boolean;
  onSubmit: (payload: UpdateUserPayload) => Promise<void>;
}

const fieldClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all duration-200",
    "placeholder:text-navy/35 focus:border-gold focus:ring-2 focus:ring-gold/30",
    invalid
      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
      : "border-gold/30",
  );

const SectionCard = ({
  title,
  delay,
  children,
}: {
  title: string;
  delay?: string;
  children: ReactNode;
}) => (
  <section
    className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center gap-3 bg-navy px-5 py-3.5">
      <span className="h-4 w-px bg-gold" />
      <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
        {title}
      </h2>
    </div>
    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

export const UserForm = ({ user, isPending, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      password: "",
    },
  });

  const [roles, setRoles] = useState<UserRole[]>(user.roles ?? []);
  const [isActive, setIsActive] = useState(Boolean(user.isActive));
  const [rolesError, setRolesError] = useState(false);
  const passwordValue = watch("password") ?? "";

  useEffect(() => {
    reset({
      email: user.email,
      fullName: user.fullName,
      password: "",
    });
    setRoles(user.roles ?? []);
    setIsActive(Boolean(user.isActive));
    setRolesError(false);
  }, [user, reset]);

  const toggleRole = (role: UserRole) => {
    setRoles((prev) => {
      const next = prev.includes(role)
        ? prev.filter((item) => item !== role)
        : [...prev, role];
      setRolesError(next.length === 0);
      return next;
    });
  };

  const handleFormSubmit = (data: FormInputs) => {
    if (roles.length === 0) {
      setRolesError(true);
      return;
    }

    return onSubmit(
      buildUserPatch(user, {
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        roles,
        isActive,
      }),
    );
  };

  return (
    <PageEnter>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="pb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="animate-fade-up">
            <AdminTitle
              title="Editar usuario"
              description="Aquí puedes editar los datos, roles y estado del usuario."
            />
            <div className="animate-gold-line h-px bg-gold" />
          </div>

          <div
            className="flex shrink-0 flex-wrap gap-2 animate-fade-up sm:gap-3"
            style={{ animationDelay: "80ms" }}
          >
            <Button
              type="button"
              variant="outline"
              className="border-navy/20 text-navy hover:bg-navy hover:text-gold"
              render={<Link to="/admin/users" />}
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-navy text-gold hover:bg-navy/90"
            >
              <SaveAll className="h-4 w-4" />
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <SectionCard title="Información del usuario" delay="100ms">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: true,
                      validate: (value) =>
                        isFullNameValid(value) || "El nombre es obligatorio",
                    })}
                    className={fieldClass(!!errors.fullName)}
                    placeholder="Nombre del usuario"
                  />
                  {errors.fullName ? (
                    <p className="mt-1 text-[11px] text-destructive">
                      {errors.fullName.message || "El nombre es obligatorio"}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                      validate: (value) =>
                        isEmailValid(value) || "Introduce un correo válido",
                    })}
                    className={fieldClass(!!errors.email)}
                    placeholder="correo@giss.com"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-[11px] text-destructive">
                      {errors.email.message || "El correo es obligatorio"}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      validate: (value) =>
                        !value ||
                        isPasswordValid(value) ||
                        "Debe incluir mayúscula, minúscula y un número",
                    })}
                    className={fieldClass(!!errors.password)}
                    placeholder="Déjala vacía para no cambiarla"
                  />
                  {errors.password ? (
                    <p className="mt-1 text-[11px] text-destructive">
                      {errors.password.message}
                    </p>
                  ) : passwordValue ? (
                    <div className="mt-2">
                      <PasswordRequirements password={passwordValue} />
                    </div>
                  ) : (
                    <p className="mt-1 text-[11px] text-navy/40">
                      Opcional. Si la completas, debe tener mayúscula, minúscula
                      y un número.
                    </p>
                  )}
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="Roles" delay="140ms">
              <div className="space-y-4">
                <div className="flex min-h-10 flex-wrap gap-2">
                  {AVAILABLE_ROLES.map((role) => (
                    <span
                      key={role}
                      className={cn(
                        "inline-flex items-center rounded-md bg-navy px-3 py-1 text-[11px] font-medium tracking-wide text-gold transition-all duration-200",
                        !roles.includes(role) && "hidden",
                      )}
                    >
                      {getRoleLabel(role)}
                      <button
                        type="button"
                        onClick={() => toggleRole(role)}
                        className="ml-2 cursor-pointer text-gold/70 transition-colors hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-navy/10 pt-4">
                  <span className="mr-1 text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Añadir
                  </span>
                  {AVAILABLE_ROLES.map((role) => {
                    const selected = roles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => toggleRole(role)}
                        disabled={selected}
                        className={cn(
                          "rounded-md px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-200",
                          selected
                            ? "cursor-not-allowed bg-navy/5 text-navy/30"
                            : "cursor-pointer border border-gold/40 bg-[#f7f3eb] text-navy hover:border-gold hover:bg-gold hover:text-navy",
                        )}
                      >
                        {getRoleLabel(role)}
                      </button>
                    );
                  })}
                </div>
                {rolesError ? (
                  <p className="text-[11px] text-destructive">
                    Selecciona al menos un rol
                  </p>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard title="Estado" delay="220ms">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-[#f7f3eb] px-3 py-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-semibold tracking-wide text-gold">
                    {getInitials(user.fullName)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-navy">
                      {user.fullName}
                    </p>
                    <p className="truncate text-[11px] text-navy/50">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsActive((prev) => !prev)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-[#f7f3eb] px-3 py-3 text-left transition-colors hover:bg-gold/10"
                >
                  <span className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Cuenta
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] tracking-wide uppercase",
                      isActive
                        ? "bg-navy text-gold"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {isActive ? "Activa" : "Inactiva"}
                  </span>
                </button>

                <div className="flex items-center justify-between rounded-lg bg-[#f7f3eb] px-3 py-3">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Roles
                  </span>
                  <span className="text-sm text-navy">{roles.length}</span>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </form>
    </PageEnter>
  );
};
