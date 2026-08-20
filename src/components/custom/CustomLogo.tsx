import { Link } from "react-router";
import { cn } from "@/lib/utils";

interface CustomLogoProps {
  title?: string;
  subtitle?: string;
  inverted?: boolean;
}

export const CustomLogo = ({
  subtitle = "Shop",
  title = "Giss",
  inverted = false,
}: CustomLogoProps) => {
  return (
    <Link to="/" className="flex items-center whitespace-nowrap group">
      <span
        className={cn(
          "font-montserrat text-lg sm:text-xl font-semibold tracking-tight m-0 whitespace-nowrap transition-colors",
          inverted ? "text-white" : "text-navy",
        )}
      >
        {title}
      </span>
      <span className="mx-2 text-gold font-light">|</span>
      <p
        className={cn(
          "m-0 whitespace-nowrap text-xs sm:text-sm tracking-[0.18em] uppercase",
          inverted ? "text-gold" : "text-muted-foreground group-hover:text-gold",
        )}
      >
        {subtitle}
      </p>
    </Link>
  );
};
