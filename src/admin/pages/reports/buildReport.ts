import { currencyFormatter } from "@/lib/currencyFormatter";
import type { Product } from "@/interfaces/product.interface";
import type { User } from "@/interfaces/user.interface";
import { getRoleLabel } from "@/admin/pages/users/user-display";
import {
  GENDER_LABELS,
  getReportTitle,
  type BuiltReport,
  type CollectionFilter,
  type ReportFormValues,
} from "./report.types";

const LOW_STOCK_MAX = 5;

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const formatDateStamp = (date: Date) =>
  date.toISOString().slice(0, 10);

const productValue = (product: Product) =>
  Number(product.price || 0) * Number(product.stock || 0);

const filterProducts = (
  products: Product[],
  collection: CollectionFilter,
) => {
  if (collection === "all") return products;
  return products.filter((product) => product.gender === collection);
};

const productRow = (product: Product) => [
  product.title,
  GENDER_LABELS[product.gender] ?? product.gender,
  product.sizes.length ? product.sizes.join(", ") : "—",
  String(Number(product.stock || 0)),
  currencyFormatter(Number(product.price || 0)),
  currencyFormatter(productValue(product)),
];

const productColumns = [
  "Prenda",
  "Colección",
  "Tallas",
  "Stock",
  "Precio",
  "Valor",
];

const buildFileName = (title: string) =>
  `giss-${slugify(title)}-${formatDateStamp(new Date())}.pdf`;

const totals = (products: Product[]) => {
  const units = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0,
  );
  const value = products.reduce(
    (sum, product) => sum + productValue(product),
    0,
  );

  return [
    { label: "Prendas", value: String(products.length) },
    { label: "Unidades", value: String(units) },
    { label: "Valor del inventario", value: currencyFormatter(value) },
  ];
};

export const buildReport = (
  form: ReportFormValues,
  products: Product[],
  users: User[],
): BuiltReport => {
  const title = getReportTitle(form.type);
  const catalog = filterProducts(products, form.collection);
  const fileName = buildFileName(title);

  if (form.type === "inventory") {
    return {
      title,
      fileName,
      sections: [
        {
          columns: productColumns,
          rows: catalog.map(productRow),
        },
      ],
      summary: totals(catalog),
    };
  }

  if (form.type === "restock") {
    const restock = catalog.filter((product) => {
      const stock = Number(product.stock || 0);
      return stock <= LOW_STOCK_MAX;
    });

    return {
      title,
      fileName,
      sections: [
        {
          columns: [
            "Prenda",
            "Colección",
            "Stock",
            "Precio",
            "Estado",
          ],
          rows: restock.map((product) => {
            const stock = Number(product.stock || 0);
            return [
              product.title,
              GENDER_LABELS[product.gender] ?? product.gender,
              String(stock),
              currencyFormatter(Number(product.price || 0)),
              stock <= 0 ? "Sin stock" : "Stock bajo",
            ];
          }),
        },
      ],
      summary: [
        {
          label: "Por reponer",
          value: String(restock.length),
        },
        {
          label: "Sin stock",
          value: String(
            restock.filter((product) => Number(product.stock || 0) <= 0).length,
          ),
        },
        {
          label: "Stock bajo",
          value: String(
            restock.filter((product) => {
              const stock = Number(product.stock || 0);
              return stock > 0 && stock <= LOW_STOCK_MAX;
            }).length,
          ),
        },
      ],
    };
  }

  if (form.type === "valuation") {
    const groups = (["women", "men", "kid", "unisex"] as const)
      .map((gender) => {
        const items = catalog.filter((product) => product.gender === gender);
        const units = items.reduce(
          (sum, product) => sum + Number(product.stock || 0),
          0,
        );
        const value = items.reduce(
          (sum, product) => sum + productValue(product),
          0,
        );

        return {
          gender,
          items,
          units,
          value,
        };
      })
      .filter((group) => group.items.length > 0);

    return {
      title,
      fileName,
      sections: [
        {
          columns: ["Colección", "Prendas", "Unidades", "Valor"],
          rows: groups.map((group) => [
            GENDER_LABELS[group.gender],
            String(group.items.length),
            String(group.units),
            currencyFormatter(group.value),
          ]),
        },
      ],
      summary: totals(catalog),
    };
  }

  if (form.type === "collections") {
    const groups = (["women", "men", "kid", "unisex"] as const)
      .map((gender) => ({
        gender,
        items: catalog.filter((product) => product.gender === gender),
      }))
      .filter((group) => group.items.length > 0);

    return {
      title,
      fileName,
      sections: [
        {
          title: "Resumen por colección",
          columns: ["Colección", "Prendas", "Unidades"],
          rows: groups.map((group) => [
            GENDER_LABELS[group.gender],
            String(group.items.length),
            String(
              group.items.reduce(
                (sum, product) => sum + Number(product.stock || 0),
                0,
              ),
            ),
          ]),
        },
        ...groups.map((group) => ({
          title: GENDER_LABELS[group.gender],
          columns: productColumns,
          rows: group.items.map(productRow),
        })),
      ],
      summary: totals(catalog),
    };
  }

  if (form.type === "incomplete") {
    const incomplete = catalog.filter(
      (product) =>
        (product.images?.length ?? 0) === 0 ||
        (product.sizes?.length ?? 0) === 0,
    );

    return {
      title,
      fileName,
      sections: [
        {
          columns: ["Prenda", "Colección", "Fotos", "Tallas", "Falta"],
          rows: incomplete.map((product) => {
            const missing = [
              (product.images?.length ?? 0) === 0 ? "fotos" : null,
              (product.sizes?.length ?? 0) === 0 ? "tallas" : null,
            ].filter(Boolean);

            return [
              product.title,
              GENDER_LABELS[product.gender] ?? product.gender,
              String(product.images?.length ?? 0),
              product.sizes.length ? product.sizes.join(", ") : "—",
              missing.join(" y ") || "—",
            ];
          }),
        },
      ],
      summary: [
        { label: "Fichas incompletas", value: String(incomplete.length) },
        {
          label: "Sin fotos",
          value: String(
            incomplete.filter((product) => (product.images?.length ?? 0) === 0)
              .length,
          ),
        },
        {
          label: "Sin tallas",
          value: String(
            incomplete.filter((product) => (product.sizes?.length ?? 0) === 0)
              .length,
          ),
        },
      ],
    };
  }

  return {
    title,
    fileName,
    sections: [
      {
        columns: ["Nombre", "Email", "Roles", "Estado"],
        rows: users.map((user) => [
          user.fullName,
          user.email,
          user.roles.map(getRoleLabel).join(", ") || "—",
          user.isActive ? "Activo" : "Inactivo",
        ]),
      },
    ],
    summary: [
      { label: "Usuarios", value: String(users.length) },
      {
        label: "Activos",
        value: String(users.filter((user) => user.isActive).length),
      },
      {
        label: "Inactivos",
        value: String(users.filter((user) => !user.isActive).length),
      },
    ],
  };
};
