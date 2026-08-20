import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link } from "react-router";

export const CustomFooter = () => {
  return (
    <footer className="bg-navy text-white animate-fade-up">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="container mx-auto pt-8 pb-6 px-4 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <CustomLogo inverted />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Ropa inspirada en el diseño minimalista y la innovación. Calidad
              premium para un estilo atemporal.
            </p>
          </div>

          <div>
            <h4 className="font-montserrat text-sm tracking-[0.16em] uppercase text-gold mb-5">
              Productos
            </h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Camisetas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Sudaderas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Chaquetas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Accesorios
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-sm tracking-[0.16em] uppercase text-gold mb-5">
              Ayuda
            </h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li>
                <Link to="/ayuda" className="hover:text-gold transition-colors">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  to="/ayuda#contacto"
                  className="hover:text-gold transition-colors"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to="/ayuda#envios"
                  className="hover:text-gold transition-colors"
                >
                  Envíos
                </Link>
              </li>
              <li>
                <Link
                  to="/ayuda#devoluciones"
                  className="hover:text-gold transition-colors"
                >
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to="/ayuda#tallas"
                  className="hover:text-gold transition-colors"
                >
                  Guía de Tallas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-montserrat text-sm tracking-[0.16em] uppercase text-gold mb-5">
              Empresa
            </h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Sustentabilidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Carreras
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gold transition-colors">
                  Prensa
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/45">
          <p>
            &copy; {new Date().getFullYear()} Giss Style. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
