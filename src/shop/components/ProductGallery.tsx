import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const hasImages = images.length > 0;
  const mainImage = images[selectedIndex] || images[0];

  if (!hasImages) {
    return (
      <div className="aspect-square bg-[#f7f3eb] rounded-sm ring-1 ring-navy/10 flex items-center justify-center">
        <p className="text-sm tracking-[0.16em] uppercase text-muted-foreground">
          Sin imágenes
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden bg-[#f7f3eb] rounded-sm ring-1 ring-gold/20">
        <img
          key={mainImage}
          src={mainImage}
          alt={title}
          className="h-full w-full object-cover animate-page-in"
        />
      </div>

      {images.length > 1 ? (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-sm ring-1 transition-all duration-300",
                selectedIndex === index
                  ? "ring-2 ring-gold"
                  : "ring-navy/10 opacity-70 hover:opacity-100 hover:ring-navy/30",
              )}
            >
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
