// src/components/ProductList.tsx
"use client";

import { ProductCard } from "./ProductCard";

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

interface ProductListProps {
  products: PrestaShopProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
