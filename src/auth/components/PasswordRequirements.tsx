import { cn } from "@/lib/utils";
import {
  getPasswordChecks,
  passwordRequirementItems,
} from "@/auth/helpers/auth-validation";

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements = ({ password }: PasswordRequirementsProps) => {
  const checks = getPasswordChecks(password);

  return (
    <div className="space-y-0.5">
      <div
        className="flex gap-2"
        role="group"
        aria-label="Requisitos de la contraseña"
      >
        {passwordRequirementItems.map((item) => {
          const met = checks[item.key];
          return (
            <span
              key={item.key}
              title={item.label}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors duration-300",
                met ? "bg-navy" : "bg-navy/15",
              )}
            >
              <span className="sr-only">
                {item.label}: {met ? "completo" : "pendiente"}
              </span>
            </span>
          );
        })}
      </div>

      <p className="text-[10px] leading-snug text-navy/45">
        La contraseña requiere al menos 6 caracteres, una mayúscula, una
        minúscula y un número o símbolo.
      </p>
    </div>
  );
};
