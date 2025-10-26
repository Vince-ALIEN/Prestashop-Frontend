// lib/image-loader.ts
import type { ImageLoader } from 'next/image';

export const prestashopImageLoader: ImageLoader = ({ src, width, quality }) => {
  // Si l'URL est déjà complète, retourne-la directement
  if (src.startsWith('http')) {
    return src;
  }

  // Sinon, construis l'URL complète
  const baseUrl = process.env.NEXT_PUBLIC_PRESTASHOP_IMG_URL || 'https://nextps.panel-ufo.fr';
  return `${baseUrl}${src}?width=${width}&quality=${quality || 75}`;
};

export default prestashopImageLoader;
