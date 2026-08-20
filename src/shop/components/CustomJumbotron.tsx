interface CustomJumbotronProps {
  title: string;
  description?: string;
}

export const CustomJumbotron = ({
  title,
  description,
}: CustomJumbotronProps) => {
  const defaultDescription =
    "Ropa minimalista y elegante inspirada en el diseño orgánico de Giss. Calidad premium para un estilo atemporal.";
  return (
    <section className="relative overflow-hidden py-6 sm:py-8 px-4 lg:px-8 bg-navy">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(175_150_97_/_18%),transparent_55%)] animate-page-in" />
      <div className="container mx-auto text-center relative">
        <div className="animate-gold-line mx-auto mb-4 h-px bg-gold" />
        <h1
          className="animate-fade-up font-montserrat text-xl sm:text-2xl lg:text-4xl font-light tracking-[0.08em] text-white mb-3 px-2"
          style={{ animationDelay: "120ms" }}
        >
          {title}
        </h1>
        <p
          className="animate-fade-up text-sm lg:text-base text-white/70 max-w-2xl mx-auto leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          {description || defaultDescription}
        </p>
      </div>
    </section>
  );
};
