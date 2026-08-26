import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getCollectionLabel, type BuiltReport, type ReportFormValues } from "./report.types";

const NAVY: [number, number, number] = [15, 23, 42];
const GOLD: [number, number, number] = [175, 150, 97];
const CREAM: [number, number, number] = [247, 243, 235];

const formatGeneratedAt = (date: Date) =>
  date.toLocaleString("es-CO", {
    dateStyle: "long",
    timeStyle: "short",
  });

const getLastTableY = (doc: jsPDF) =>
  (doc as jsPDF & { lastAutoTable?: { finalY: number } }).lastAutoTable
    ?.finalY;

export const generateReportPdf = (
  form: ReportFormValues,
  report: BuiltReport,
) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const generatedAt = formatGeneratedAt(new Date());
  const paintedPages = new Set<number>();

  const drawChrome = (pageNumber: number) => {
    if (paintedPages.has(pageNumber)) return;
    paintedPages.add(pageNumber);

    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, 28, "F");
    doc.setFillColor(...GOLD);
    doc.rect(0, 28, pageWidth, 1.2, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("GISS", 14, 13);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...GOLD);
    doc.setFontSize(10);
    doc.text("|  SHOP", 32, 13);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.text(report.title, 14, 23);

    doc.setFillColor(...GOLD);
    doc.rect(0, pageHeight - 8, pageWidth, 8, "F");
    doc.setTextColor(...NAVY);
    doc.setFontSize(8);
    doc.text("Giss | Shop  ·  Reporte operativo del catalogo", 14, pageHeight - 3.2);
    doc.text(`Pagina ${pageNumber}`, pageWidth - 14, pageHeight - 3.2, {
      align: "right",
    });
  };

  const currentPage = () => doc.getNumberOfPages();

  drawChrome(1);

  const meta = [
    `Fecha: ${generatedAt}`,
    form.period.trim() ? `Periodo: ${form.period.trim()}` : "",
    form.preparedBy.trim() ? `Elaborado por: ${form.preparedBy.trim()}` : "",
    form.type !== "users"
      ? `Coleccion: ${getCollectionLabel(form.collection)}`
      : "",
  ].filter(Boolean);

  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(meta.join("   ·   "), 14, 36);

  let cursorY = 42;

  if (form.notes.trim()) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Observaciones", 14, cursorY);
    doc.setFont("helvetica", "normal");
    const notes = doc.splitTextToSize(form.notes.trim(), pageWidth - 28);
    doc.text(notes, 14, cursorY + 5);
    cursorY += 8 + notes.length * 4.2;
  }

  report.sections.forEach((section) => {
    if (cursorY > pageHeight - 40) {
      doc.addPage();
      drawChrome(currentPage());
      cursorY = 36;
    }

    if (section.title) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...NAVY);
      doc.text(section.title, 14, cursorY);
      cursorY += 5;
    }

    autoTable(doc, {
      startY: cursorY,
      head: [section.columns],
      body:
        section.rows.length > 0
          ? section.rows
          : [
              section.columns.map((_, index) =>
                index === 0 ? "Sin registros" : "",
              ),
            ],
      theme: "grid",
      margin: { left: 14, right: 14, top: 34, bottom: 14 },
      headStyles: {
        fillColor: NAVY,
        textColor: 255,
        fontStyle: "bold",
        fontSize: 8,
      },
      bodyStyles: {
        textColor: NAVY,
        fontSize: 8,
      },
      alternateRowStyles: {
        fillColor: CREAM,
      },
      didDrawPage: () => {
        drawChrome(currentPage());
      },
    });

    cursorY = (getLastTableY(doc) ?? cursorY) + 10;
  });

  if (report.summary.length > 0) {
    if (cursorY > pageHeight - 28) {
      doc.addPage();
      drawChrome(currentPage());
      cursorY = 36;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text("Resumen", 14, cursorY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    report.summary.forEach((item, index) => {
      const x = 14 + (index % 3) * 90;
      const lineY = cursorY + 8 + Math.floor(index / 3) * 7;
      doc.text(`${item.label}: ${item.value}`, x, lineY);
    });
  }

  doc.save(report.fileName);
};
