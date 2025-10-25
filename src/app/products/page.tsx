// src/components/ProductImage.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getPrestaShopImageUrl } from '@/lib/image-helper';

interface ProductImageProps {
  imageId?: string | number | null;
  alt: string;
  size?: 'cart_default' | 'small_default' | 'medium_default' | 'large_default' | 'thickbox_default';
  className?: string;
  priority?: boolean;
}

export default function ProductImage({
  imageId,
  alt,
  size = 'large_default',
  className = '',
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);

  if (!imageId || error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-200 ${className}`}>
        <svg 
          className="w-20 h-20 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
        </svg>
        <p className="text-gray-500 text-sm mt-2">Aucune image</p>
      </div>
    );
  }

  const imageUrl = getPrestaShopImageUrl(imageId, size);

  return (
    <Image
      src={imageUrl}
      alt={alt}
      fill
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}