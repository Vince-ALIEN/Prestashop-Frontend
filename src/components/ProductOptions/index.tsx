"use client";

import { useState } from "react";
import AttributeSelector from "../AttributeSelector";
import { FormattedAttributeGroup, FormattedCombination } from "@/lib/types";

interface ProductOptionsProps {
  groups: FormattedAttributeGroup[];
  combinations: FormattedCombination[];
  basePrice: string;
  isProductActive: boolean;
}

export default function ProductOptions({
  groups,
  combinations,
  basePrice,
  isProductActive,
}: ProductOptionsProps) {
  const [selectedCombination, setSelectedCombination] =
    useState<FormattedCombination | null>(null);
  const [quantity, setQuantity] = useState(1);

  const price = selectedCombination?.price || basePrice;
  const isAvailable = isProductActive && (selectedCombination?.stock ?? 0) > 0;

  const handleAddToCart = () => {
    // Logique d'ajout au panier client-side
    console.log("Produit ajouté au panier:", {
      combination: selectedCombination,
      quantity,
    });

    alert(`${quantity} × produit ajouté au panier`);
  };

  return (
    <div className="space-y-6">
      {/* Prix */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-blue-600">{price} €</span>
      </div>

      {/* Sélecteurs d'attributs */}
      {groups.length > 0 && (
        <AttributeSelector
          groups={groups}
          combinations={combinations}
          onSelectionChange={setSelectedCombination}
        />
      )}

      {/* Disponibilité */}
      <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50">
        {isAvailable ? (
          <>
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-700 font-medium">En stock</span>
          </>
        ) : (
          <>
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-red-700 font-medium">
              {isProductActive
                ? "Combinaison indisponible"
                : "Produit indisponible"}
            </span>
          </>
        )}
      </div>

      {/* Quantité et ajout au panier */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="text-gray-700 font-medium">
            Quantité:
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            max="99"
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isAvailable}
          onClick={handleAddToCart}
        >
          {isAvailable ? "🛒 Ajouter au panier" : "❌ Produit indisponible"}
        </button>
      </div>
    </div>
  );
}
