"use client";

import ProductOptions from "./ProductOptions";
import { FormattedAttributeGroup, FormattedCombination } from "@/lib/types";

interface ProductOptionsWrapperProps {
  groups: FormattedAttributeGroup[];
  combinations: FormattedCombination[];
  basePrice: string;
  isProductActive: boolean;
  productId: number;
  productName: string;
}

export default function ProductOptionsWrapper({
  groups,
  combinations,
  basePrice,
  isProductActive,
  productId,
  productName,
}: ProductOptionsWrapperProps) {
  const handleAddToCart = (
    combination: FormattedCombination | null,
    quantity: number,
  ) => {
    console.log("Produit ajouté au panier:", {
      productId,
      productName,
      combination,
      quantity,
    });
    
    alert(`${quantity} × ${productName} ajouté au panier`);
  };
  
  return (
    <ProductOptions
      groups={groups}
      combinations={combinations}
      basePrice={basePrice}
      isProductActive={isProductActive}
      onAddToCart={handleAddToCart}
    />
  );
}