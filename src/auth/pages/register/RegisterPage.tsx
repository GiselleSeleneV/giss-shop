import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useNavigate } from "react-router";
import { registerAction } from "@/auth/actions/register.action";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { AuthHeroPanel } from "@/auth/components/AuthHeroPanel";
import { PasswordRequirements } from "@/auth/components/PasswordRequirements";
import { getAuthErrorMessage } from "@/auth/helpers/auth-error";
import {
  isEmailValid,
  isFullNameValid,
  isPasswordValid,
} from "@/auth/helpers/auth-validation";
import { cn } from "@/lib/utils";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const fullNameOk = isFullNameValid(fullName);
  const emailOk = isEmailValid(email);
  const passwordOk = isPasswordValid(password);
  const canSubmit = fullNameOk && emailOk && passwordOk && !isLoading;

  const fullNameError = useMemo(() => {
    if (!fullNameTouched) return "";
    if (!fullName.trim()) return "El nombre es obligatorio.";
    if (!fullNameOk) return "Introduce tu nombre completo.";
    return "";
  }, [fullName, fullNameOk, fullNameTouched]);

  const emailError = useMemo(() => {
    if (!emailTouched) return "";
    if (!email.trim()) return "El correo es obligatorio.";
    if (!emailOk) return "Introduce un correo válido.";
    return "";
  }, [email, emailOk, emailTouched]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFullNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    if (!fullNameOk || !emailOk || !passwordOk) return;

    try {
      setIsLoading(true);
      const data = await registerAction(fullName.trim(), email.trim(), password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
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
                  Crea una nueva cuenta en GISS STYLE
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullName">Nombre completo</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Nombre completo"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  onBlur={() => setFullNameTouched(true)}
                  aria-invalid={fullNameTouched && !fullNameOk}
                  className={cn(
                    fullNameTouched &&
                      !fullNameOk &&
                      "border-destructive focus-visible:border-destructive",
                  )}
                />
                {fullNameError ? (
                  <p className="text-xs text-destructive">{fullNameError}</p>
                ) : null}
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
                <Label htmlFor="password">Contraseña</Label>
                <div className="space-y-2">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
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
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/auth/login"
                  className="underline underline-offset-4 text-gold hover:text-navy"
                >
                  Ingresa ahora
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
