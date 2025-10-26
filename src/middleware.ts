// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateSlug } from './lib/utils'
import { prestashopAPI } from './lib/prestashop'

// Fonction pour extraire la valeur dans la langue actuelle
function getLanguageValue(field: any): string {
  if (!field) return ""
  if (typeof field === "string") return field
  if (Array.isArray(field) && field.length > 0) {
    return field[0]?.value || ""
  }
  return ""
}

export async function middleware(request: NextRequest) {
  // Vérifie si l'URL correspond à /products/[id]
  const pathname = request.nextUrl.pathname
  const productsIdMatch = pathname.match(/^\/products\/(\d+)$/)

  if (productsIdMatch) {
    const productId = productsIdMatch[1]

    try {
      // Récupère le produit pour obtenir son nom
      const response = await prestashopAPI.getProduct(productId)
      let product: any = null

      if (response.products) {
        if ((response.products as any).product) {
          product = (response.products as any).product
        } else if ((response.products as any).id) {
          product = response.products
        } else if (Array.isArray(response.products)) {
          product = response.products[0]
        } else if (typeof response.products === "object") {
          const values = Object.values(response.products)
          product = values[0]
        }
      }

      if (product && product.id) {
        const name = getLanguageValue(product.name) || "produit-sans-nom"
        const slug = `${generateSlug(name)}-${product.id}`

        // Redirige vers la nouvelle URL avec slug
        return NextResponse.redirect(new URL(`/products/${slug}`, request.url))
      }
    } catch (error) {
      console.error("Erreur lors de la redirection:", error)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/products/:id*'],
}
