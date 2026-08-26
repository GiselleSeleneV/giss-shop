import { AdminTitle } from "@/admin/components/AdminTitle";
import { useAdminDashboard } from "@/admin/hooks/useAdminDashboard";
import { CustomLoading } from "@/components/custom/CustomLoading";
import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/auth/store/auth.store";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { buildReport } from "./buildReport";
import { generateReportPdf } from "./generateReportPdf";
import {
  COLLECTION_OPTIONS,
  REPORT_OPTIONS,
  type CollectionFilter,
  type ReportFormValues,
  type ReportType,
} from "./report.types";

const currentPeriod = () => {
  const raw = new Intl.DateTimeFormat("es-CO", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  return raw.charAt(0).toUpperCase() + raw.slice(1);
};

const fieldClass = () =>
  cn(
    "w-full rounded-lg border border-gold/30 bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all duration-200",
    "placeholder:text-navy/35 focus:border-gold focus:ring-2 focus:ring-gold/30",
  );

export const AdminReportsPage = () => {
  const { user } = useAuthStore();
  const { products, users, isLoading, isError } = useAdminDashboard();
  const [isDownloading, setIsDownloading] = useState(false);
  const [form, setForm] = useState<ReportFormValues>({
    type: "inventory",
    collection: "all",
    period: currentPeriod(),
    preparedBy: user?.fullName ?? "",
    notes: "",
  });

  useEffect(() => {
    if (!user?.fullName) return;
    setForm((prev) =>
      prev.preparedBy ? prev : { ...prev, preparedBy: user.fullName },
    );
  }, [user?.fullName]);

  const report = useMemo(
    () => buildReport(form, products, users),
    [form, products, users],
  );

  const previewSection = report.sections[0];
  const previewRows = previewSection?.rows.slice(0, 8) ?? [];
  const usesCollection = form.type !== "users";

  const updateForm = <K extends keyof ReportFormValues>(
    key: K,
    value: ReportFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = () => {
    try {
      setIsDownloading(true);
      generateReportPdf(form, report);
      toast.success("El reporte se descargó en PDF", {
        position: "top-right",
      });
    } catch {
      toast.error("No se pudo generar el PDF. Inténtalo de nuevo.", {
        position: "top-right",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return <CustomLoading message="Cargando datos del reporte" />;
  }

  if (isError) {
    return (
      <PageEnter>
        <AdminTitle
          title="Reportes"
          description="No se pudo cargar el catálogo para armar el reporte."
        />
      </PageEnter>
    );
  }

  return (
    <PageEnter>
      <div className="mb-6 animate-fade-up">
        <AdminTitle
          title="Reportes"
          description="Arma un reporte del catálogo, el inventario o el equipo y descárgalo en PDF."
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section
            className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <div className="flex items-center gap-3 bg-navy px-4 sm:px-5 py-3.5">
              <span className="h-4 w-px bg-gold" />
              <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
                Tipo de reporte
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 sm:p-5">
              {REPORT_OPTIONS.map((option) => {
                const selected = form.type === option.type;
                return (
                  <button
                    type="button"
                    key={option.type}
                    onClick={() => updateForm("type", option.type as ReportType)}
                    className={cn(
                      "rounded-lg border p-4 text-left transition-all",
                      selected
                        ? "border-gold bg-gold/10"
                        : "border-navy/10 bg-[#f7f3eb]/60 hover:border-gold/50",
                    )}
                  >
                    <p className="text-sm font-medium text-navy">
                      {option.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-navy/55">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <section
            className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up"
            style={{ animationDelay: "140ms" }}
          >
            <div className="flex items-center justify-between gap-3 bg-navy px-4 sm:px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="h-4 w-px bg-gold" />
                <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
                  Vista previa
                </h2>
              </div>
              <span className="text-[11px] tracking-[0.16em] uppercase text-gold">
                {previewSection?.rows.length ?? 0} registros
              </span>
            </div>
            <div className="overflow-x-auto p-4 sm:p-5">
              {previewRows.length === 0 ? (
                <p className="py-8 text-center text-sm text-navy/45">
                  No hay datos para este reporte con los filtros actuales.
                </p>
              ) : (
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy/10">
                      {previewSection.columns.map((column) => (
                        <th
                          key={column}
                          className="px-2 py-2 text-[11px] font-medium tracking-[0.12em] uppercase text-navy/50"
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, index) => (
                      <tr key={`${row[0]}-${index}`} className="border-b border-navy/5">
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`${cell}-${cellIndex}`}
                            className="px-2 py-2.5 text-navy"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {(previewSection?.rows.length ?? 0) > 8 ? (
                <p className="mt-3 text-[11px] text-navy/40">
                  Mostrando 8 de {previewSection.rows.length}. El PDF incluye
                  el listado completo.
                </p>
              ) : null}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section
            className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center gap-3 bg-navy px-4 sm:px-5 py-3.5">
              <span className="h-4 w-px bg-gold" />
              <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
                Datos del reporte
              </h2>
            </div>
            <div className="space-y-4 p-4 sm:p-5">
              {usesCollection ? (
                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Colección
                  </label>
                  <select
                    value={form.collection}
                    onChange={(event) =>
                      updateForm(
                        "collection",
                        event.target.value as CollectionFilter,
                      )
                    }
                    className={fieldClass()}
                  >
                    {COLLECTION_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                  Periodo
                </label>
                <input
                  type="text"
                  value={form.period}
                  onChange={(event) => updateForm("period", event.target.value)}
                  className={fieldClass()}
                  placeholder="Agosto 2026"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                  Elaborado por
                </label>
                <input
                  type="text"
                  value={form.preparedBy}
                  onChange={(event) =>
                    updateForm("preparedBy", event.target.value)
                  }
                  className={fieldClass()}
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                  Observaciones
                </label>
                <textarea
                  rows={4}
                  value={form.notes}
                  onChange={(event) => updateForm("notes", event.target.value)}
                  className={cn(fieldClass(), "resize-none")}
                  placeholder="Notas para el cierre de inventario, reposición o revisión de fichas..."
                />
              </div>

              <div className="space-y-2 rounded-lg bg-[#f7f3eb] px-3 py-3">
                {report.summary.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-[11px] tracking-[0.12em] uppercase text-navy/50">
                      {item.label}
                    </span>
                    <span className="text-sm text-navy">{item.value}</span>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                disabled={isDownloading}
                onClick={handleDownload}
                className="w-full bg-navy text-gold hover:bg-navy/90"
              >
                <Download className="h-4 w-4" />
                {isDownloading ? "Generando..." : "Descargar PDF"}
              </Button>
              <p className="text-[11px] leading-relaxed text-navy/40">
                El PDF usa el catálogo y los usuarios actuales. No incluye
                ventas ni pedidos porque el sistema aún no los registra.
              </p>
            </div>
          </section>
        </div>
      </div>
    </PageEnter>
  );
};
