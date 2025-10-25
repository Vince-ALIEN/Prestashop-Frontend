// src/lib/image-helper.ts

/**
 * Format PrestaShop réel : /{id_image}-{image_type}/{product_slug}.jpg
 * Exemple : /15-large_default/illustration-vectorielle-renard.jpg
 */
export function getPrestaShopImageUrl(
  imageId: string | number,
  productSlug: string,
  size: 'cart_default' | 'small_default' | 'medium_default' | 'large_default' | 'home_default' | 'thickbox_default' = 'large_default'
): string {
  const baseUrl = process.env.NEXT_PUBLIC_PRESTASHOP_URL || 'https://nextps.panel-ufo.fr';
  const id = String(imageId);
  
  // Format réel PrestaShop
  return `${baseUrl}/${id}-${size}/${productSlug}.jpg`;
}

/**
 * Fallback : Format classique si pas de slug
 */
export function getPrestaShopImageUrlFallback(
  imageId: string | number,
  size: string = 'large_default'
): string {
  const baseUrl = process.env.NEXT_PUBLIC_PRESTASHOP_URL || 'https://nextps.panel-ufo.fr';
  const id = String(imageId);
  
  // Format alternatif : /img/p/{id}/{id}-{size}.jpg
  return `${baseUrl}/img/p/${id}/${id}-${size}.jpg`;
}