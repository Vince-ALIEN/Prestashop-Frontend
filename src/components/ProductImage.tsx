// src/components/ProductImage.tsx
import Image from "next/image";

interface ProductImageProps {
  productId: number;
  imageName: string; // ✅ Nom du fichier image (ex: "hummingbird-printed-t-shirt")
  alt: string;
  size?: "small" | "medium" | "large"; // ✅ Optionnel : taille de l'image
  className?: string;
  priority?: boolean;
}

export default function ProductImage({
  productId,
  imageName,
  alt,
  size = "medium", // ✅ Taille par défaut
  className = "",
  priority = false,
}: ProductImageProps) {
  // ✅ Construction de l'URL selon le format de ton PrestaShop
  const imageUrl = `https://nextps.panel-ufo.fr/${productId}-product_main/${imageName}.jpg`;

  // ✅ Tailles d'image
  const imageSizes = {
    small: { width: 200, height: 200 },
    medium: { width: 450, height: 450 },
    large: { width: 800, height: 800 },
  };

  // ✅ Utilise la taille demandée ou "medium" par défaut
  const currentSize = imageSizes[size];

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={currentSize.width}
      height={currentSize.height}
      className={className}
      priority={priority}
      unoptimized={true}
    />
  );
}
