// src/app/products/page.tsx
import Link from "next/link";
import { ProductImage } from "@/components/ProductImage";
import { prestashopAPI } from "@/lib/prestashop";
import { generateSlug } from "@/lib/utils";

// Interface pour un produit PrestaShop
interface PrestaShopProduct {
  id: number;
  name: string | Array<{ value: string }>;
  link_rewrite: string | Array<{ value: string }>;
  price: string;
  active: string | number | boolean;
  associations?: {
    images?: Array<any>;
  };
}

// Interface pour la réponse API
interface PrestaShopResponse {
  products: PrestaShopProduct[] | PrestaShopProduct | { [key: string]: PrestaShopProduct };
}

// Fonction pour extraire la valeur dans la langue actuelle
function getLanguageValue(field: any): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (Array.isArray(field) && field.length > 0) {
    return field[0]?.value || "";
  }
  return "";
}

// Fonction pour générer un slug
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export default async function ProductsPage() {
  // Typage explicite du tableau de produits
  let products: PrestaShopProduct[] = [];
  try {
    const response: PrestaShopResponse = await prestashopAPI.getProducts();
    if (Array.isArray(response.products)) {
      products = response.products;
    } else if (typeof response.products === 'object' && response.products !== null) {
      if ('product' in response.products) {
        products = [response.products.product];
      } else {
        products = [response.products];
      }
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Produits</h1>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun produit disponible.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: PrestaShopProduct) => {
              const name = getLanguageValue(product.name) || "Produit sans nom";
              const slug = `${generateSlug(name)}-${product.id}`;
              const imageName = getLanguageValue(product.link_rewrite) || "";
              const price = product.price ? parseFloat(product.price).toFixed(2) : "0.00";
              const isActive = product.active === "1" || product.active === 1 || product.active === true;

              return (
                <Link
                  key={product.id}
                  href={`/products/${slug}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-64 w-full bg-gray-100">
                    <ProductImage
                      productId={product.id}
                      imageName={imageName}
                      alt={name}
                      size="medium"
                      className="h-full w-full"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">{name}</h2>
                    <p className="text-gray-700 font-medium">{price} €</p>
                    {!isActive && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full mt-2">
                        Indisponible
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
