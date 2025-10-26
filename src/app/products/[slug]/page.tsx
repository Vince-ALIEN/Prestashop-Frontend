// src/app/products/[slug]/page.tsx
import { prestashopAPI } from "@/lib/prestashop";
import { ProductImage } from "@/components/ProductImage";
import ProductOptionsWrapper from "@/components/ProductOptionsWrapper";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormattedAttributeGroup, FormattedCombination } from "@/lib/types";

// Fonction utilitaire pour générer un slug
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

// Fonction pour extraire l'ID depuis un slug
function extractIdFromSlug(slug: string): number {
  const parts = slug.split("-");
  const id = parts[parts.length - 1];
  return Number(id);
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

// Interface pour la réponse API
interface PrestaShopResponse {
  products: any | { product: any } | any[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage(props: PageProps) {
  try {
    const params = await props.params;
    const { slug } = params;
    const id = extractIdFromSlug(slug);

    const response: PrestaShopResponse = await prestashopAPI.getProduct(id.toString());
    let product: any = null;

    if (response.products) {
      if ((response.products as any).product) {
        product = (response.products as any).product;
      } else if ((response.products as any).id) {
        product = response.products;
      } else if (Array.isArray(response.products)) {
        product = response.products[0];
      } else if (typeof response.products === "object") {
        const values = Object.values(response.products);
        product = values[0];
      }
    }

    if (!product || !product.id) {
      notFound();
    }

    const name = getLanguageValue(product.name) || "Produit sans nom";
    const description = getLanguageValue(product.description) || "";
    const descriptionShort = getLanguageValue(product.description_short) || "";
    const price = product.price || "0";
    const formattedPrice = parseFloat(price).toFixed(2);
    const reference = product.reference || "";
    const isActive = product.active === "1" || product.active === 1 || product.active === true;
    const isAvailable = product.available_for_order === "1" || product.available_for_order === 1 || product.available_for_order === true;
    const imageName = getLanguageValue(product.link_rewrite);

    let formattedGroups: FormattedAttributeGroup[] = [];
    let formattedCombinations: FormattedCombination[] = [];

    if (product.associations?.product_option_values?.length > 0) {
      const [attributeGroupsResponse, attributeValuesResponse, combinationsResponse] = await Promise.all([
        prestashopAPI.getAttributeGroups(),
        prestashopAPI.getAttributeValues(),
        prestashopAPI.getProductCombinations(id.toString())
      ]);

      const attributeGroups = attributeGroupsResponse.product_options || [];
      const attributeValues = attributeValuesResponse.product_option_values || [];
      const combinations = combinationsResponse.combinations || [];

      formattedGroups = attributeGroups
        .map((group: any) => {
          const groupId = parseInt(group.id);
          const groupName = getLanguageValue(group.name);
          const values = attributeValues.filter(
            (val: any) => parseInt(val.id_attribute_group) === groupId,
          );
          const productOptionValues = product.associations?.product_option_values || [];
          const productValueIds = productOptionValues.map((val: any) => parseInt(val.id));
          const availableValues = values.filter((val: any) => productValueIds.includes(parseInt(val.id)));

          return {
            id: groupId,
            name: groupName,
            values: availableValues.map((val: any) => ({
              id: parseInt(val.id),
              name: val.name,
              color: val.color || null,
            })),
          };
        })
        .filter((group: any) => group.values.length > 0);

      formattedCombinations = combinations.map((combo: any) => {
        const comboAttributes = combo.associations?.product_option_values || [];
        const attributeIds = comboAttributes.map((attr: any) => parseInt(attr.id));
        return {
          id: parseInt(combo.id),
          reference: combo.reference || "",
          price: combo.price ? parseFloat(combo.price).toFixed(2) : formattedPrice,
          stock: parseInt(combo.quantity || "0"),
          attributes: attributeIds,
        };
      });
    }

    return (
      <main className="min-h-screen bg-gray-50">
        {/* ... reste du code inchangé ... */}
      </main>
    );
  } catch (error) {
    console.error("❌ Error:", error);
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        {/* ... reste du code inchangé ... */}
      </main>
    );
  }
}
