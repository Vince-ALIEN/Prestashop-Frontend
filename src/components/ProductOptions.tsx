"use client";

import { useState, useEffect } from "react";
import { FormattedAttributeGroup, FormattedCombination } from "@/lib/types";

interface ProductOptionsProps {
  groups: FormattedAttributeGroup[];
  combinations: FormattedCombination[];
  basePrice: string;
  isProductActive: boolean;
  onAddToCart: (combination: FormattedCombination | null, quantity: number) => void;
}

export default function ProductOptions({
  groups,
  combinations,
  basePrice,
  isProductActive,
  onAddToCart
}: ProductOptionsProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<{[key: number]: number}>({});
  const [selectedCombination, setSelectedCombination] = useState<FormattedCombination | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  // Trouver la combinaison correspondant aux attributs sélectionnés
  useEffect(() => {
    if (Object.keys(selectedAttributes).length !== groups.length) {
      setSelectedCombination(null);
      return;
    }
    
    const selectedAttributeIds = Object.values(selectedAttributes);
    const matchingCombination = combinations.find(combination => {
      const combinationAttrs = combination.attributes;
      // Vérifier si tous les attributs sélectionnés sont présents dans la combinaison
      return selectedAttributeIds.every(id => combinationAttrs.includes(id));
    });
    
    setSelectedCombination(matchingCombination || null);
  }, [selectedAttributes, groups, combinations]);
  
  // Gérer la sélection d'attribut
  const handleAttributeSelect = (groupId: number, attributeId: number) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [groupId]: attributeId
    }));
  };
  
  // Prix à afficher
  const displayPrice = selectedCombination?.price || basePrice;
  
  // Vérifier la disponibilité
  const isAvailable = isProductActive && (selectedCombination?.stock ?? 0) > 0;
  
  // Gérer l'ajout au panier
  const handleAddToCart = () => {
    onAddToCart(selectedCombination, quantity);
  };
  
  return (
    <div className="space-y-6">
      {/* Prix */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-blue-600">
          {displayPrice} €
        </span>
      </div>
      
      {/* Sélecteurs d'attributs */}
      <div className="space-y-4 border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900">Options disponibles</h3>
        
        {groups.map(group => (
          <div key={group.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {group.name}:
            </label>
            
            {/* Affichage des couleurs */}
            {group.id === 2 ? (
              <div className="flex flex-wrap gap-2">
                {group.values.map(value => (
                  <button
                    key={value.id}
                    type="button"
                    title={value.name}
                    onClick={() => handleAttributeSelect(group.id, value.id)}
                    className={`w-8 h-8 rounded-full border transition-all ${
                      selectedAttributes[group.id] === value.id 
                        ? "border-2 border-blue-500 ring-2 ring-blue-300" 
                        : "border-gray-300 hover:border-blue-500"
                    }`}
                    style={{ backgroundColor: value.color || '#eee' }}
                  >
                    {!value.color && value.name.substring(0, 1)}
                  </button>
                ))}
              </div>
            ) : (
              // Autres attributs (taille, etc.)
              <select 
                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={e => handleAttributeSelect(group.id, parseInt(e.target.value))}
                value={selectedAttributes[group.id] || ""}
              >
                <option value="">Sélectionnez {group.name.toLowerCase()}</option>
                {group.values.map(value => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      
      {/* Disponibilité */}
      <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50">
        {isAvailable ? (
          <>
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-700 font-medium">
              En stock
            </span>
          </>
        ) : (
          <>
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-red-700 font-medium">
              {isProductActive ? "Combinaison indisponible" : "Produit indisponible"}
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
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            max="99"
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isAvailable || Object.keys(selectedAttributes).length !== groups.length}
          onClick={handleAddToCart}
        >
          {isAvailable && Object.keys(selectedAttributes).length === groups.length
            ? "🛒 Ajouter au panier"
            : groups.length > 0 && Object.keys(selectedAttributes).length !== groups.length
            ? "Veuillez sélectionner toutes les options"
            : "❌ Produit indisponible"}
        </button>
      </div>
    </div>
  );
}