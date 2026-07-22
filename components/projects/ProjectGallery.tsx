import type { GalleryItem } from "@/lib/projects";
import { BentoGallery } from "@/components/shared/BentoGallery";

export function ProjectGallery({ items }: { items: GalleryItem[] }) {
  return (
    <BentoGallery
      heading={
        <>
          Project <span className="text-green-dark">gallery</span>
        </>
      }
      items={items}
    />
  );
}
