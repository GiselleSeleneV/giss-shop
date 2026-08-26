import type { Gender } from "@/interfaces/product.interface";

export type ReportType =
  | "inventory"
  | "restock"
  | "valuation"
  | "collections"
  | "incomplete"
  | "users";

export type CollectionFilter = "all" | Gender;

export interface ReportFormValues {
  type: ReportType;
  collection: CollectionFilter;
  period: string;
  preparedBy: string;
  notes: string;
}

export interface ReportSection {
  title?: string;
  columns: string[];
  rows: string[][];
}

export interface BuiltReport {
  title: string;
  fileName: string;
  sections: ReportSection[];
  summary: { label: string; value: string }[];
}

export const REPORT_OPTIONS: {
  type: ReportType;
  title: string;
  description: string;
}[] = [
  {
    type: "inventory",
    title: "Inventario de prendas",
    description: "Catálogo con tallas, stock, precio y valor por ficha.",
  },
  {
    type: "restock",
    title: "Reposición de stock",
    description: "Prendas agotadas o con 5 unidades o menos.",
  },
  {
    type: "valuation",
    title: "Valoración de inventario",
    description: "Valor del stock (precio × unidades) por colección.",
  },
  {
    type: "collections",
    title: "Catálogo por colección",
    description: "Mujer, hombre, niño y unisex con el detalle de prendas.",
  },
  {
    type: "incomplete",
    title: "Fichas incompletas",
    description: "Prendas sin fotos o sin tallas para completar.",
  },
  {
    type: "users",
    title: "Directorio de usuarios",
    description: "Cuentas del panel, roles y estado.",
  },
];

export const COLLECTION_OPTIONS: { value: CollectionFilter; label: string }[] =
  [
    { value: "all", label: "Todas las colecciones" },
    { value: "women", label: "Mujer" },
    { value: "men", label: "Hombre" },
    { value: "kid", label: "Niño" },
    { value: "unisex", label: "Unisex" },
  ];

export const GENDER_LABELS: Record<Gender, string> = {
  women: "Mujer",
  men: "Hombre",
  kid: "Niño",
  unisex: "Unisex",
};

export const getReportTitle = (type: ReportType) =>
  REPORT_OPTIONS.find((option) => option.type === type)?.title ?? "Reporte";

export const getCollectionLabel = (collection: CollectionFilter) =>
  COLLECTION_OPTIONS.find((option) => option.value === collection)?.label ??
  "Todas";
