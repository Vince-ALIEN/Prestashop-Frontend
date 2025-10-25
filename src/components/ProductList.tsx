// src/components/ProductList.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  description_short: string;
  link_rewrite: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?limit=12&page=${page}`);
      
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      
      // Adapter selon la structure de votre réponse PrestaShop
      const productsArray = Array.isArray(data.products) 
        ? data.products 
        : Object.values(data.products || {});
      
      setProducts(productsArray as Product[]);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={fetchProducts}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description_short={product.description_short}
            link_rewrite={product.link_rewrite}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <span className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Page {page}
        </span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Suivant
        </button>
      </div>
    </>
  );
}