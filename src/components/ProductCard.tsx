// src/components/ProductCard.tsx
import Link from "next/link";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  description_short: string;
  link_rewrite: string | any[];
}

function getLanguageValue(field: any): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (Array.isArray(field)) return field[0]?.value || field[0] || "";
  return "";
}

export default function ProductCard({
  id,
  name,
  price,
  description_short,
  link_rewrite,
}: ProductCardProps) {
  const formattedPrice = parseFloat(price).toFixed(2);
  const imageName = getLanguageValue(link_rewrite); // ✅ Utilise link_rewrite comme imageName

  return (
    <Link href={`/products/${id}`}>
      <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {imageName ? (
            <ProductImage
              productId={id}
              imageName={imageName}
              alt={name}
              size="medium"
              className="group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-gray-200 group-hover:scale-110 transition-transform duration-500">
              <svg
                className="w-20 h-20 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-500 text-sm mt-2">Aucune image</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div
            className="text-sm text-gray-600 mb-3 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description_short }}
          />
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              {formattedPrice} €
            </span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
              Voir →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
