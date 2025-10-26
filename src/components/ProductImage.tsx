// src/components/ProductImage.tsx
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
"use client";

>>>>>>> Stashed changes
=======
"use client";

>>>>>>> Stashed changes
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  productId: number;
  imageName: string; // ✅ Nom du fichier image (ex: "hummingbird-printed-t-shirt")
  alt: string;
  size?: "small" | "medium" | "large"; // ✅ Optionnel : taille de l'image
  className?: string;
  priority?: boolean;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
  className?: string;
>>>>>>> Stashed changes
=======
  className?: string;
>>>>>>> Stashed changes
}

export function ProductImage({
  productId,
  imageName,
  alt,
  size = "medium", // ✅ Taille par défaut
  className = "",
  priority = false,
}: ProductImageProps) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
  const [error, setError] = useState(false);

  // Mapper les tailles aux dimensions
  const sizeMap = {
    small: { width: 80, height: 80 },
    medium: { width: 300, height: 300 },
    large: { width: 600, height: 600 },
  };

  const { width, height } = sizeMap[size];

  if (!imageName || error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-200 ${className}`}>
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-gray-500 mt-1">Image indisponible</p>
      </div>
    );
  }

  // URL basée sur les logs
  const imageUrl = `https://nextps.panel-ufo.fr/${productId}-product_main_2x/${imageName}.jpg`;
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return (
    <Image
      src={imageUrl}
      alt={alt}
<<<<<<< Updated upstream
      width={currentSize.width}
      height={currentSize.height}
      className={className}
      priority={priority}
=======
      width={width}
      height={height}
      className={`object-cover ${className}`}
      priority={priority || size === "large"}
      onError={() => setError(true)}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      unoptimized={true}
    />
  );
}
