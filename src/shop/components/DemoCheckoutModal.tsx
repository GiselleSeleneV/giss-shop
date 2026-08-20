import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface DemoCheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export const DemoCheckoutModal = ({ open, onClose }: DemoCheckoutModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar aviso"
      />
      <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto animate-soft-scale rounded-lg border border-gold/25 bg-white p-5 sm:p-8 shadow-2xl">
        <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-navy">
          <GraduationCap className="size-6 text-gold" />
        </div>
        <div className="mx-auto mb-5 h-px w-12 bg-gold" />
        <h2 className="font-montserrat text-center text-xl font-light tracking-[0.08em] text-navy mb-3">
          Aplicación de demostración
        </h2>
        <p className="text-center text-sm leading-relaxed text-navy/70 mb-2">
          Giss Shop es un proyecto educativo. El pago no se procesa y no se
          realiza ninguna compra real.
        </p>
        <p className="text-center text-xs tracking-wide text-muted-foreground mb-6">
          Puedes seguir explorando el catálogo y el carrito con total libertad.
        </p>
        <Button
          className="w-full h-10 bg-navy text-gold hover:bg-navy/90"
          onClick={onClose}
        >
          Entendido
        </Button>
      </div>
    </div>
  );
};
