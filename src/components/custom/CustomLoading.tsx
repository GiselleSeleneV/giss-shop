import { cn } from "@/lib/utils";

interface CustomLoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: {
    wrapper: "size-8",
    ring: "border",
    inner: "inset-1",
    dot: "size-1.5",
    text: "text-[10px] tracking-[0.28em]",
  },
  md: {
    wrapper: "size-14",
    ring: "border-[1.5px]",
    inner: "inset-1.5",
    dot: "size-2",
    text: "text-xs tracking-[0.35em]",
  },
  lg: {
    wrapper: "size-20",
    ring: "border-2",
    inner: "inset-2",
    dot: "size-2.5",
    text: "text-sm tracking-[0.4em]",
  },
};

export const CustomLoading = ({
  message = "Cargando",
  size = "md",
  fullScreen = false,
  className,
}: CustomLoadingProps) => {
  const styles = sizeStyles[size];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex flex-col items-center justify-center gap-6",
        fullScreen ? "min-h-[60vh]" : "py-24 px-4",
        className,
      )}
    >
      <div className={cn("relative", styles.wrapper)}>
        <div
          className={cn(
            "absolute inset-0 rounded-full border-muted/80",
            styles.ring,
          )}
        />
        <div
          className={cn(
            "absolute inset-0 animate-spin rounded-full border-transparent border-t-gold",
            styles.ring,
          )}
        />
        <div
          className={cn(
            "absolute animate-spin rounded-full border-transparent border-b-navy/20 [animation-direction:reverse] [animation-duration:1.8s]",
            styles.inner,
            styles.ring,
          )}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn("rounded-full bg-gold animate-pulse", styles.dot)}
          />
        </div>
      </div>

      {message ? (
        <p
          className={cn(
            "font-montserrat font-light uppercase text-muted-foreground",
            styles.text,
          )}
        >
          {message}
        </p>
      ) : null}

      <span className="sr-only">Cargando contenido, por favor espera</span>
    </div>
  );
};
