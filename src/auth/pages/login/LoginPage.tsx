import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Shield } from "lucide-react";
import { AuthHeroPanel } from "@/auth/components/AuthHeroPanel";
import { PasswordRequirements } from "@/auth/components/PasswordRequirements";
import { isEmailValid, isPasswordValid } from "@/auth/helpers/auth-validation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/auth/store/auth.store";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAdmin } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailOk = isEmailValid(email);
  const passwordOk = isPasswordValid(password);
  const canSubmit = emailOk && passwordOk && !isLoading && !isAdminLoading;

  const emailError = useMemo(() => {
    if (!emailTouched) return "";
    if (!email.trim()) return "El correo es obligatorio.";
    if (!emailOk) return "Introduce un correo válido.";
    return "";
  }, [email, emailOk, emailTouched]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    if (!emailOk || !passwordOk) return;

    const loginIsSuccess = await login(email.trim(), password);

    if (loginIsSuccess) {
      navigate(isAdmin() ? "/admin" : "/");
      return;
    }

    toast.error("Credenciales incorrectas");
    setIsLoading(false);
  };

  const handleAdminLogin = async () => {
    if (isAdminLoading) return;

    setIsAdminLoading(true);
    const loginIsSuccess = await login("test1@google.com", "Abc123");

    if (loginIsSuccess) {
      navigate("/admin");
      return;
    }

    toast.error("No se pudo entrar con la cuenta de administrador.");
    setIsAdminLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <Card className="overflow-hidden p-0 border-gold/20 shadow-none ring-1 ring-gold/15">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-5 sm:p-6 md:p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <CustomLogo />
                <p className="text-balance text-muted-foreground">
                  Inicia sesión en tu cuenta de GISS STYLE
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  aria-invalid={emailTouched && !emailOk}
                  className={cn(
                    emailTouched &&
                      !emailOk &&
                      "border-destructive focus-visible:border-destructive",
                  )}
                />
                {emailError ? (
                  <p className="text-xs text-destructive">{emailError}</p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="sm:ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={() => setPasswordTouched(true)}
                    onBlur={() => setPasswordTouched(true)}
                    aria-invalid={passwordTouched && !passwordOk}
                    className={cn(
                      passwordTouched &&
                        !passwordOk &&
                        password.length > 0 &&
                        "border-destructive focus-visible:border-destructive",
                      passwordOk && "border-gold focus-visible:border-gold",
                    )}
                  />
                  <PasswordRequirements password={password} />
                </div>
              </div>
              <Button
                disabled={!canSubmit}
                type="submit"
                className="w-full bg-navy text-gold hover:bg-navy/90 disabled:opacity-40"
              >
                {isLoading ? "Ingresando..." : "Iniciar sesión"}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Continuar con admin
                </span>
              </div>
              <div className="rounded-lg border border-gold/30 bg-[#f7f3eb] p-4">
                <Button
                  type="button"
                  disabled={isAdminLoading}
                  onClick={handleAdminLogin}
                  className="w-full bg-navy text-gold hover:bg-navy/90 disabled:opacity-40"
                >
                  <Shield className="size-4" />
                  {isAdminLoading
                    ? "Ingresando..."
                    : "Entrar como administrador"}
                </Button>
                <p className="mt-3 text-center text-xs leading-relaxed text-navy/70">
                  Con la cuenta de administrador podrás acceder a las pantallas
                  de configuración de la tienda.
                </p>
              </div>
              <div className="text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/auth/register"
                  className="underline underline-offset-4 text-gold hover:text-navy"
                >
                  Regístrate
                </Link>
              </div>
            </div>
          </form>
          <AuthHeroPanel />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros{" "}
        <Link to="/aviso#terminos">Términos de servicio</Link> y{" "}
        <Link to="/aviso#privacidad">Política de privacidad</Link>.
      </div>
    </div>
  );
};
