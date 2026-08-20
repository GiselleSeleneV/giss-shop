import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import {
  GraduationCap,
  LayoutGrid,
  Ruler,
  Search,
  Shield,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useEffect } from "react";

const sizeGuide = [
  { size: "XS", chest: "82 – 86", waist: "66 – 70" },
  { size: "S", chest: "86 – 90", waist: "70 – 74" },
  { size: "M", chest: "90 – 96", waist: "74 – 80" },
  { size: "L", chest: "96 – 102", waist: "80 – 86" },
  { size: "XL", chest: "102 – 108", waist: "86 – 92" },
  { size: "XXL", chest: "108 – 116", waist: "92 – 100" },
];

const topics = [
  { href: "#catalogo", icon: LayoutGrid, label: "Catálogo" },
  { href: "#carrito", icon: ShoppingBag, label: "Carrito" },
  { href: "#cuenta", icon: UserRound, label: "Cuenta" },
  { href: "#tallas", icon: Ruler, label: "Tallas" },
  { href: "#envios", icon: Truck, label: "Envíos" },
  { href: "#admin", icon: Shield, label: "Admin" },
];

const HelpSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24">
    <div className="flex items-center gap-3 mb-4">
      <span className="h-4 w-px bg-gold" />
      <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-navy">
        {title}
      </h2>
    </div>
    <div className="space-y-3 text-sm leading-relaxed text-navy/70">
      {children}
    </div>
  </section>
);

export const HelpPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <PageEnter>
      <CustomJumbotron
        title="Centro de ayuda"
        description="Una guía breve de Giss Shop: cómo explorar el catálogo, usar el carrito y moverte por la cuenta y el panel de administración."
      />

      <section className="py-8 sm:py-12 px-4 lg:px-8">
        <div className="container mx-auto max-w-3xl space-y-10">
          <div className="animate-fade-up rounded-lg border border-gold/25 bg-[#f7f3eb] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy">
                <GraduationCap className="size-5 text-gold" />
              </div>
              <div>
                <p className="font-montserrat text-sm tracking-[0.14em] uppercase text-navy mb-2">
                  Proyecto educativo
                </p>
                <p className="text-sm leading-relaxed text-navy/70">
                  Giss Shop es una demostración. Puedes recorrer productos,
                  filtrar, guardar piezas en el carrito y abrir el pago, pero
                  no se procesa ninguna compra real ni se envían datos de
                  pago.
                </p>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <a
                  key={topic.href}
                  href={topic.href}
                  className="flex items-center gap-3 rounded-md border border-navy/10 bg-white px-3 py-3 text-sm text-navy hover:border-gold/40 hover:text-gold transition-colors"
                >
                  <Icon className="size-4 shrink-0 text-gold" />
                  {topic.label}
                </a>
              );
            })}
          </div>

          <div className="space-y-12 animate-fade-up" style={{ animationDelay: "140ms" }}>
            <HelpSection id="catalogo" title="Explorar el catálogo">
              <p>
                En la portada ves todos los productos. Desde el menú puedes
                ir a colecciones de{" "}
                <Link to="/gender/men" className="text-gold hover:text-navy">
                  hombres
                </Link>
                ,{" "}
                <Link to="/gender/women" className="text-gold hover:text-navy">
                  mujeres
                </Link>{" "}
                y{" "}
                <Link to="/gender/kid" className="text-gold hover:text-navy">
                  niños
                </Link>
                .
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <Search className="inline size-3.5 mr-1 text-gold" />
                  Escribe en el buscador y pulsa Enter para filtrar por nombre.
                </li>
                <li>
                  Usa Filtros para acotar por talla (XS a XXL) y rango de
                  precio.
                </li>
                <li>
                  La paginación al final de la lista cambia de página sin
                  perder los filtros.
                </li>
                <li>
                  En cada tarjeta puedes añadir al carrito la primera talla
                  disponible, o abrir el detalle para elegir otra.
                </li>
              </ul>
            </HelpSection>

            <HelpSection id="producto" title="Ficha de producto">
              <p>
                Al entrar a una pieza verás la galería, el precio, las
                etiquetas y el stock. Elige una talla para habilitar
                “Agregar al carrito”. Si no hay existencias, el botón aparece
                como agotado.
              </p>
            </HelpSection>

            <HelpSection id="carrito" title="Carrito y pago">
              <p>
                El icono de bolsa en el encabezado abre el carrito. Ahí
                puedes cambiar cantidades o quitar piezas. El contenido se
                guarda en este navegador, así que sigue disponible si recargas
                la página.
              </p>
              <p>
                Al pulsar Pagar se muestra un aviso de demostración: no hay
                pasarela de pago ni pedido real.
              </p>
            </HelpSection>

            <HelpSection id="cuenta" title="Iniciar sesión y registro">
              <p>
                Desde{" "}
                <Link to="/auth/login" className="text-gold hover:text-navy">
                  Iniciar sesión
                </Link>{" "}
                o{" "}
                <Link
                  to="/auth/register"
                  className="text-gold hover:text-navy"
                >
                  Crear cuenta
                </Link>{" "}
                puedes ver las pantallas de acceso. En esta demo no se crea
                una sesión real: sirven para recorrer el flujo de la
                interfaz.
              </p>
            </HelpSection>

            <HelpSection id="admin" title="Panel de administración">
              <p>
                El botón Admin abre un panel de ejemplo con métricas,
                inventario y un formulario para crear o editar productos. Es
                una vista de diseño: los cambios no se guardan en el servidor
                todavía.
              </p>
              <Link to="/admin">
                <Button
                  variant="outline"
                  className="mt-2 border-navy/20 text-navy hover:bg-navy hover:text-gold"
                >
                  <Shield className="size-4" />
                  Ir al panel
                </Button>
              </Link>
            </HelpSection>

            <HelpSection id="tallas" title="Guía de tallas">
              <p>
                Las medidas son orientativas (en cm) para la silueta relajada
                de Giss. Si estás entre dos tallas, elige la mayor.
              </p>
              <div className="overflow-x-auto rounded-lg border border-navy/10 bg-white">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead className="bg-navy text-white">
                    <tr>
                      <th className="px-4 py-3 font-montserrat text-[11px] font-light tracking-[0.14em] uppercase">
                        Talla
                      </th>
                      <th className="px-4 py-3 font-montserrat text-[11px] font-light tracking-[0.14em] uppercase">
                        Pecho
                      </th>
                      <th className="px-4 py-3 font-montserrat text-[11px] font-light tracking-[0.14em] uppercase">
                        Cintura
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuide.map((row) => (
                      <tr key={row.size} className="border-t border-navy/10">
                        <td className="px-4 py-3 font-medium text-navy">
                          {row.size}
                        </td>
                        <td className="px-4 py-3">{row.chest}</td>
                        <td className="px-4 py-3">{row.waist}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </HelpSection>

            <HelpSection id="envios" title="Envíos">
              <p>
                No hay envíos reales en Giss Shop. El flujo de carrito y pago
                existe solo para mostrar cómo se vería una tienda completa.
              </p>
            </HelpSection>

            <HelpSection id="devoluciones" title="Devoluciones">
              <p>
                Como no se realizan compras, no hay política de devolución ni
                cambios. En un proyecto en producción aquí irían plazos,
                condiciones y el proceso de reembolso.
              </p>
            </HelpSection>

            <HelpSection id="contacto" title="Contacto">
              <p>
                Esta tienda no atiende pedidos. Si estás recorriendo el
                proyecto, vuelve al catálogo o sigue explorando el panel de
                administración.
              </p>
              <Link to="/">
                <Button className="mt-2 bg-navy text-gold hover:bg-navy/90">
                  Volver a la tienda
                </Button>
              </Link>
            </HelpSection>
          </div>
        </div>
      </section>
    </PageEnter>
  );
};
