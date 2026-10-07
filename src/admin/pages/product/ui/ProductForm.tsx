import { AdminTitle } from "@/admin/components/AdminTitle";
import { PageEnter } from "@/components/custom/PageEnter";
import { Button } from "@/components/ui/button";
import type { Product, Size } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import { getProductImageUrl } from "@/shop/helpers/product-image";
import { Plus, SaveAll, Tag, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

interface Props {
  title: string;
  subTitle: string;
  product: Product;
  isPending: boolean;
  onSubmit: (
    productLike: Partial<Product> & { files?: File[] },
  ) => Promise<void>;
}

const availableSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs extends Product {
  files?: File[];
}

const fieldClass = (invalid?: boolean) =>
  cn(
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-navy outline-none transition-all duration-200",
    "placeholder:text-navy/35 focus:border-gold focus:ring-2 focus:ring-gold/30",
    invalid
      ? "border-destructive focus:border-destructive focus:ring-destructive/20"
      : "border-gold/30",
  );

const SectionCard = ({
  title,
  delay,
  children,
}: {
  title: string;
  delay?: string;
  children: ReactNode;
}) => (
  <section
    className="overflow-hidden rounded-lg border border-navy/10 bg-white shadow-sm animate-fade-up"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center gap-3 bg-navy px-5 py-3.5">
      <span className="h-4 w-px bg-gold" />
      <h2 className="font-montserrat text-sm font-light tracking-[0.18em] uppercase text-white">
        {title}
      </h2>
    </div>
    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

export const ProductForm = ({
  title,
  subTitle,
  product,
  isPending,
  onSubmit,
}: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm<FormInputs>({
    defaultValues: product,
  });
  const labelInputRef = useRef<HTMLInputElement>(null);
  const [currentImages, setCurrentImages] = useState<string[]>(
    product.images ?? [],
  );
  const [files, setFiles] = useState<File[]>([]);
  const isEditing = Boolean(product.id);
  const productImagesKey = (product.images ?? []).join("|");

  useEffect(() => {
    reset(product);
    setCurrentImages(product.images ?? []);
    setFiles([]);
  }, [product, productImagesKey, reset]);

  const selectedSizes = watch("sizes") ?? [];
  const selectedTags = watch("tags") ?? [];
  const currentStock = watch("stock") ?? 0;

  const addTag = () => {
    const newTag = labelInputRef.current!.value.trim();
    if (newTag === "") return;
    const newTagSet = new Set(selectedTags);
    newTagSet.add(newTag);
    setValue("tags", Array.from(newTagSet));
    labelInputRef.current!.value = "";
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      getValues("tags").filter((tag) => tag !== tagToRemove),
    );
  };

  const addSize = (size: Size) => {
    const sizeSet = new Set(getValues("sizes"));
    sizeSet.add(size);
    setValue("sizes", Array.from(sizeSet));
  };

  const removeSize = (sizeToRemove: string) => {
    setValue(
      "sizes",
      getValues("sizes").filter((size) => size !== sizeToRemove),
    );
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

  const appendFiles = (incoming: File[]) => {
    setFiles((prev) => [...prev, ...incoming]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!e.dataTransfer.files) return;
    appendFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    appendFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const removePendingFile = (indexToRemove: number) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const removeCurrentImage = (indexToRemove: number) => {
    setCurrentImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleFormSubmit = (data: FormInputs) => {
    return onSubmit({
      ...data,
      images: currentImages,
      files,
    });
  };

  return (
    <PageEnter>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="pb-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="animate-fade-up">
            <AdminTitle title={title} description={subTitle} />
            <div className="animate-gold-line h-px bg-gold" />
          </div>

          <div
            className="flex shrink-0 flex-wrap gap-2 animate-fade-up sm:gap-3"
            style={{ animationDelay: "80ms" }}
          >
            <Button
              type="button"
              variant="outline"
              className="border-navy/20 text-navy hover:bg-navy hover:text-gold"
              render={<Link to="/admin/products" />}
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-navy text-gold hover:bg-navy/90"
            >
              <SaveAll className="h-4 w-4" />
              {isPending ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <SectionCard title="Información del producto" delay="100ms">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Título del producto
                  </label>
                  <input
                    type="text"
                    {...register("title", { required: true })}
                    className={fieldClass(!!errors.title)}
                    placeholder="Título del producto"
                  />
                  {errors.title ? (
                    <p className="mt-1 text-[11px] text-destructive">
                      El título es requerido
                    </p>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                      Precio ($)
                    </label>
                    <input
                      type="number"
                      {...register("price", { required: true, min: 1 })}
                      className={fieldClass(!!errors.price)}
                      placeholder="Precio del producto"
                    />
                    {errors.price ? (
                      <p className="mt-1 text-[11px] text-destructive">
                        El precio debe ser mayor a 0
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                      Stock
                    </label>
                    <input
                      type="number"
                      {...register("stock", { required: true, min: 1 })}
                      className={fieldClass(!!errors.stock)}
                      placeholder="Stock del producto"
                    />
                    {errors.stock ? (
                      <p className="mt-1 text-[11px] text-destructive">
                        El inventario debe ser mayor a 0
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Slug
                  </label>
                  <input
                    type="text"
                    {...register("slug", {
                      required: true,
                      validate: (value) =>
                        !/\s/.test(value) ||
                        "El slug no puede contener espacios",
                    })}
                    className={fieldClass(!!errors.slug)}
                    placeholder="slug-del-producto"
                  />
                  {errors.slug ? (
                    <p className="mt-1 text-[11px] text-destructive">
                      {errors.slug.message || "El slug es requerido"}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Género
                  </label>
                  <select {...register("gender")} className={fieldClass()}>
                    <option value="men">Hombre</option>
                    <option value="women">Mujer</option>
                    <option value="unisex">Unisex</option>
                    <option value="kid">Niño</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase text-navy/60">
                    Descripción
                  </label>
                  <textarea
                    rows={5}
                    {...register("description", { required: true })}
                    className={cn(
                      fieldClass(!!errors.description),
                      "resize-none",
                    )}
                    placeholder="Descripción del producto"
                  />
                  {errors.description ? (
                    <p className="mt-1 text-[11px] text-destructive">
                      La descripción es requerida
                    </p>
                  ) : null}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Tallas disponibles" delay="180ms">
              <div className="space-y-4">
                <div className="flex min-h-10 flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <span
                      key={size}
                      className={cn(
                        "inline-flex items-center rounded-md bg-navy px-3 py-1 text-[11px] font-medium tracking-wide text-gold transition-all duration-200",
                        !selectedSizes.includes(size) && "hidden",
                      )}
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="ml-2 cursor-pointer text-gold/70 transition-colors hover:text-white"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-navy/10 pt-4">
                  <span className="mr-1 text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Añadir
                  </span>
                  {availableSizes.map((size) => {
                    const selected = selectedSizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => addSize(size)}
                        disabled={selected}
                        className={cn(
                          "min-w-10 rounded-md px-3 py-1 text-[11px] font-medium tracking-wide transition-all duration-200",
                          selected
                            ? "cursor-not-allowed bg-navy/5 text-navy/30"
                            : "cursor-pointer border border-gold/40 bg-[#f7f3eb] text-navy hover:border-gold hover:bg-gold hover:text-navy",
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Etiquetas" delay="260ms">
              <div className="space-y-4">
                <div className="flex min-h-8 flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md border border-gold/30 bg-[#f7f3eb] px-3 py-1 text-[11px] font-medium tracking-wide text-navy"
                    >
                      <Tag className="mr-1.5 h-3 w-3 text-gold" />
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 cursor-pointer text-navy/40 transition-colors hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    ref={labelInputRef}
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Añadir nueva etiqueta..."
                    className={fieldClass()}
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    className="shrink-0 bg-navy text-gold hover:bg-navy/90"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-6">
            <SectionCard title="Imágenes" delay="140ms">
              <div
                className={cn(
                  "relative rounded-lg border-2 border-dashed p-6 text-center transition-all duration-300",
                  dragActive
                    ? "scale-[1.02] border-gold bg-gold/10"
                    : "border-gold/35 bg-[#f7f3eb]/50 hover:border-gold hover:bg-gold/5",
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
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={handleFileChange}
                />
                <div className="pointer-events-none space-y-3">
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-navy">
                    <Upload className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-montserrat text-sm font-light tracking-wide text-navy">
                      Arrastra las imágenes aquí
                    </p>
                    <p className="mt-1 text-[11px] tracking-[0.12em] uppercase text-navy/45">
                      o haz clic para buscar
                    </p>
                  </div>
                  <p className="text-[10px] tracking-wide text-navy/35">
                    PNG, JPG, WebP hasta 10MB
                  </p>
                </div>
              </div>

              {files.length > 0 ? (
                <div className="mt-6 space-y-3 border border-red-500 rounded-lg p-2">
                  <h3 className="text-[11px] font-medium tracking-[0.14em] uppercase text-gold">
                    Imágenes por cargar
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className="group relative animate-image-pop"
                        style={{ animationDelay: `${index * 60}ms` }}
                      >
                        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-gold/30 bg-[#f7f3eb] transition-transform duration-300 group-hover:-translate-y-0.5">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          aria-label="Quitar imagen por cargar"
                          onClick={() => removePendingFile(index)}
                          className="absolute top-2 right-2 rounded-full bg-navy p-1 text-gold shadow-sm transition-colors hover:bg-destructive hover:text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {isEditing ? (
                <div className="mt-6 space-y-3">
                  <h3 className="text-[11px] font-medium tracking-[0.14em] uppercase text-navy/50">
                    Imágenes actuales
                  </h3>
                  {currentImages.length === 0 ? (
                    <p className="text-[11px] tracking-wide text-navy/40">
                      Sin imágenes actuales.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {currentImages.map((image, index) => (
                        <div
                          key={`${image}-${index}`}
                          className="group relative animate-image-pop"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-navy/10 bg-[#f7f3eb] transition-transform duration-300 group-hover:-translate-y-0.5">
                            <img
                              src={getProductImageUrl(image)}
                              alt="Producto"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            aria-label="Quitar imagen actual"
                            onClick={() => removeCurrentImage(index)}
                            className="absolute top-2 right-2 rounded-full bg-navy p-1 text-gold shadow-sm transition-colors hover:bg-destructive hover:text-white"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </SectionCard>

            <SectionCard title="Estado" delay="220ms">
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-[#f7f3eb] px-3 py-3">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Estado
                  </span>
                  <span className="rounded-md bg-navy px-2.5 py-1 text-[11px] tracking-wide text-gold">
                    Activo
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f7f3eb] px-3 py-3">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Inventario
                  </span>
                  <span
                    className={cn(
                      "rounded-md px-2.5 py-1 text-[11px] tracking-wide",
                      currentStock > 5
                        ? "bg-navy text-gold"
                        : currentStock > 0
                          ? "bg-gold/20 text-navy"
                          : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {currentStock > 5
                      ? "En stock"
                      : currentStock > 0
                        ? "Bajo stock"
                        : "Sin stock"}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f7f3eb] px-3 py-3">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Imágenes
                  </span>
                  <span className="text-sm text-navy">
                    {currentImages.length + files.length}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-[#f7f3eb] px-3 py-3">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-navy/50">
                    Tallas
                  </span>
                  <span className="text-sm text-navy">
                    {selectedSizes.length}
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </form>
    </PageEnter>
  );
};
