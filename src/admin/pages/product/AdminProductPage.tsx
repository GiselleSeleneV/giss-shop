import { AdminTitle } from "@/admin/components/AdminTitle";
import { useParams } from "react-router";

import { useState } from "react";
import { X, Plus, Upload, Tag, SaveAll } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { PageEnter } from "@/components/custom/PageEnter";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: string;
  tags: string[];
  images: string[];
}

const fieldClass =
  "w-full px-4 py-2.5 bg-white border border-navy/15 rounded-md text-navy placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-navy/15 focus:border-navy transition-all duration-200";

const labelClass =
  "block text-xs font-medium tracking-[0.14em] uppercase text-navy mb-2";

const Section = ({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <section
    className={cn(
      "overflow-hidden rounded-lg border shadow-sm",
      dark ? "bg-navy border-navy" : "bg-white border-navy/10",
    )}
  >
    <div
      className={cn(
        "flex items-center gap-3 px-4 sm:px-6 py-3.5",
        dark ? "bg-navy" : "bg-navy",
      )}
    >
      <span className="h-4 w-px bg-gold" />
      <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
        {title}
      </h2>
    </div>
    <div className={cn("p-4 sm:p-6", dark && "text-white")}>{children}</div>
  </section>
);

export const AdminProductPage = () => {
  const { id } = useParams();

  const productTitle = id === "new" ? "Nuevo producto" : "Editar producto";
  const productSubtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";

  const [product, setProduct] = useState<Product>({
    id: "376e23ed-df37-4f88-8f84-4561da5c5d46",
    title: "Sudadera ligera Raven para hombre",
    price: 115,
    description:
      "Presentamos la colección Giss Raven. La sudadera ligera Raven para hombre tiene una silueta premium y relajada, elaborada con una mezcla sostenible de bambú y algodón. Incluye sutiles logotipos Giss de poliuretano termoplástico en el pecho y en la manga, y un interior de felpa francesa para mayor versatilidad en cualquier temporada. Compuesta por 70 % de bambú y 30 % de algodón.",
    slug: "sudadera_ligera_raven_hombre",
    stock: 10,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    gender: "men",
    tags: ["sudadera"],
    images: [
      "https://placehold.co/250x250",
      "https://placehold.co/250x250",
      "https://placehold.co/250x250",
      "https://placehold.co/250x250",
    ],
  });

  const [newTag, setNewTag] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const availableSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !product.tags.includes(newTag.trim())) {
      setProduct((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addSize = (size: string) => {
    if (!product.sizes.includes(size)) {
      setProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
  };

  const removeSize = (sizeToRemove: string) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((size) => size !== sizeToRemove),
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    console.log(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
  };

  return (
    <PageEnter>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6 animate-fade-up">
        <AdminTitle title={productTitle} description={productSubtitle} />
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button
            variant="outline"
            className="border-navy/20 text-navy hover:bg-navy hover:text-white"
          >
            <Link to="/admin/products" className="flex items-center gap-2">
              <X className="w-4 h-4" />
              Cancelar
            </Link>
          </Button>

          <Button className="bg-navy text-gold hover:bg-navy/90">
            <SaveAll className="w-4 h-4" />
            Guardar cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <div className="lg:col-span-2 space-y-6">
          <Section title="Información del producto">
            <div className="space-y-5">
              <div>
                <label className={labelClass}>Título del producto</label>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={fieldClass}
                  placeholder="Título del producto"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Precio ($)</label>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) =>
                      handleInputChange("price", parseFloat(e.target.value))
                    }
                    className={fieldClass}
                    placeholder="Precio del producto"
                  />
                </div>

                <div>
                  <label className={labelClass}>Existencias</label>
                  <input
                    type="number"
                    value={product.stock}
                    onChange={(e) =>
                      handleInputChange("stock", parseInt(e.target.value))
                    }
                    className={fieldClass}
                    placeholder="Cantidad disponible"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>URL amigable</label>
                <input
                  type="text"
                  value={product.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  className={fieldClass}
                  placeholder="url-amigable-del-producto"
                />
              </div>

              <div>
                <label className={labelClass}>Género del producto</label>
                <select
                  value={product.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className={fieldClass}
                >
                  <option value="men">Hombre</option>
                  <option value="women">Mujer</option>
                  <option value="unisex">Unisex</option>
                  <option value="kids">Niños</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Descripción del producto</label>
                <textarea
                  value={product.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={5}
                  className={cn(fieldClass, "resize-none leading-relaxed")}
                  placeholder="Descripción del producto"
                />
              </div>
            </div>
          </Section>

          <Section title="Tallas disponibles">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-navy text-gold"
                  >
                    {size}
                    <button
                      onClick={() => removeSize(size)}
                      className="text-gold/70 hover:text-gold transition-colors"
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-navy/10">
                <p className={cn(labelClass, "mb-3")}>Añadir tallas</p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => addSize(size)}
                      disabled={product.sizes.includes(size)}
                      className={cn(
                        "min-w-12 px-3 py-1.5 rounded-md text-sm font-medium border transition-all duration-200",
                        product.sizes.includes(size)
                          ? "border-navy/10 bg-[#f7f3eb] text-navy/30 cursor-not-allowed"
                          : "border-navy/25 text-navy hover:bg-navy hover:text-gold hover:border-navy cursor-pointer",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section title="Etiquetas">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-navy text-white"
                  >
                    <Tag className="h-3 w-3 mr-1.5 text-gold" />
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-gold hover:text-white transition-colors duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag()}
                  placeholder="Añadir nueva etiqueta..."
                  className={fieldClass}
                />
                <Button onClick={addTag} className="px-4 shrink-0 bg-navy text-gold hover:bg-navy/90">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Imágenes del producto">
            <div
              className={cn(
                "relative border border-dashed rounded-md p-6 text-center transition-all duration-200",
                dragActive
                  ? "border-navy bg-navy/5"
                  : "border-navy/25 hover:border-navy hover:bg-navy/5",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              <div className="space-y-3 pointer-events-none">
                <Upload className="mx-auto h-10 w-10 text-navy" />
                <div>
                  <p className="text-sm font-medium text-navy">
                    Arrastra las imágenes aquí
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    o haz clic para buscar
                  </p>
                </div>
                <p className="text-[11px] tracking-wide uppercase text-gold/80">
                  PNG, JPG, WebP hasta 10MB
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className={labelClass}>Imágenes actuales</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-[#f7f3eb] rounded-md border border-gold/20 overflow-hidden">
                      <img
                        src={image}
                        alt="Producto"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 bg-navy text-white rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Estado del producto" dark>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10">
                <span className="text-sm text-white/70">Estado</span>
                <span className="px-2.5 py-1 text-[11px] tracking-wide uppercase font-medium bg-gold text-navy rounded-md">
                  Activo
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10">
                <span className="text-sm text-white/70">Inventario</span>
                <span
                  className={cn(
                    "px-2.5 py-1 text-[11px] tracking-wide uppercase font-medium rounded-md",
                    product.stock > 5
                      ? "bg-gold text-navy"
                      : product.stock > 0
                        ? "bg-gold/20 text-gold"
                        : "bg-white/10 text-white",
                  )}
                >
                  {product.stock > 5
                    ? "Disponible"
                    : product.stock > 0
                      ? "Pocas existencias"
                      : "Agotado"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10">
                <span className="text-sm text-white/70">Imágenes</span>
                <span className="text-sm font-medium text-gold">
                  {product.images.length}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10">
                <span className="text-sm text-white/70">Tallas</span>
                <span className="text-sm font-medium text-gold">
                  {product.sizes.length}
                </span>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </PageEnter>
  );
};
