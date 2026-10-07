import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { Link, useLocation } from "react-router";
import { useEffect } from "react";

const NoticeSection = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="scroll-mt-24">
    <div className="mb-4 flex items-center gap-3">
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

export const LegalNoticePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [hash]);

  return (
    <PageEnter>
      <CustomJumbotron
        title="Aviso del proyecto"
        description="Giss Shop es una aplicación de demostración. Aquí se describe su alcance técnico y el uso de los datos que genera el entorno de prueba."
      />

      <section className="px-4 py-8 sm:py-12 lg:px-8">
        <div className="container mx-auto max-w-3xl space-y-12">
          <div className="animate-fade-up rounded-lg border border-gold/25 bg-[#f7f3eb] p-5 sm:p-6">
            <p className="font-montserrat text-sm tracking-[0.14em] uppercase text-navy mb-2">
              Proyecto de portafolio
            </p>
            <p className="text-sm leading-relaxed text-navy/70">
              Giss Shop modela el frente de una tienda para practicar el
              desarrollo de una aplicación web y documentar ese trabajo ante
              procesos de selección. El catálogo, el carrito, el registro y el
              panel de administración sirven para recorrer la arquitectura. No
              hay operación comercial, pasarela de pago ni compromiso de envío.
            </p>
          </div>

          <NoticeSection id="terminos" title="Términos de servicio">
            <p>
              El cliente está construido con React y TypeScript, empaquetado
              con Vite. React Router separa la tienda pública, las pantallas
              de acceso y las rutas del panel, estas últimas condicionadas al
              rol de administrador. TanStack Query consulta la API, Zustand
              conserva la sesión y Tailwind CSS define la interfaz. Las
              peticiones salen con Axios e incluyen el token en el encabezado
              Authorization.
            </p>
            <p>
              La cuenta de administrador del inicio de sesión es una
              credencial de semilla del entorno de prueba. Abre el panel para
              revisar productos, usuarios y reportes. Los precios, el stock y
              las fichas pertenecen a ese mismo entorno y no representan una
              oferta vigente.
            </p>
            <p>
              Al continuar se acepta usar Giss Shop como demostración técnica.
              No se formaliza una compraventa ni se adquiere un derecho sobre
              el inventario mostrado.
            </p>
          </NoticeSection>

          <NoticeSection id="privacidad" title="Política de privacidad">
            <p>
              Los datos que produce la aplicación permanecen en el entorno de
              prueba. Su función es sostener los flujos que un revisor técnico
              puede ejecutar.
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                El token de sesión se guarda en el localStorage del navegador
                para conservar la autenticación entre recargas y se elimina al
                cerrar sesión.
              </li>
              <li>
                El carrito se persiste en el mismo navegador. No se convierte
                en un pedido ni se envía a una pasarela.
              </li>
              <li>
                El registro y el inicio de sesión transmiten nombre, correo y
                contraseña a la API del proyecto. La interfaz no muestra la
                contraseña almacenada.
              </li>
              <li>
                No se solicitan tarjeta, dirección de envío ni documentos de
                identidad.
              </li>
            </ul>
            <p>
              Giss Shop no comercializa datos ni los cede a terceros: no opera
              como servicio abierto al público. Conviene tratar cuentas,
              correos y el catálogo como información de prueba.
            </p>
          </NoticeSection>

          <div>
            <Link to="/">
              <Button className="bg-navy text-gold hover:bg-navy/90">
                Volver a la tienda
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageEnter>
  );
};
