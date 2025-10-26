// src/app/page.tsx
import { ProductList } from "@/components/ProductList";
import { prestashopAPI } from "@/lib/prestashop";

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

export default async function HomePage() {
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
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Produits</h1>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun produit disponible.</p>
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </main>
  );
}
