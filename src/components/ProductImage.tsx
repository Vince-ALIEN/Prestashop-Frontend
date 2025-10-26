// components/ProductImage.tsx
import Image from "next/image";

interface ProductImageProps {
  productId: number | string;
  imageName: string;
  alt: string;
  size?: "small" | "medium" | "large";
  priority?: boolean;
  className?: string; // Ajoutez cette ligne
}

export default function ProductImage({
  productId,
  imageName,
  alt,
  size = "medium",
  priority = false,
  className = "",
}: ProductImageProps) {
  // Déterminez les dimensions selon la taille
  const dimensions = {
    small: { width: 80, height: 80 },
    medium: { width: 300, height: 300 },
    large: { width: 600, height: 600 },
  };

  const { width, height } = dimensions[size];

  // Construire l'URL de l'image
  const imageUrl = `https://nextps.panel-ufo.fr/${productId}-product_main/${imageName}.jpg`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover w-full h-full ${className}`}
      priority={priority || size === "large"} // Priorité pour les grandes images
      loading={priority || size === "large" ? "eager" : "lazy"} // Chargement eager pour les grandes images
    />
  );
}
