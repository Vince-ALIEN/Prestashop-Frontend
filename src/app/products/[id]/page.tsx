// src/app/products/[id]/page.tsx
import { prestashopAPI } from "@/lib/prestashop";
import ProductImage from "@/components/ProductImage";
import Link from "next/link";
import { notFound } from "next/navigation";

function getLanguageValue(field: any): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (Array.isArray(field) && field.length > 0) {
    return field[0]?.value || "";
  }
  return "";
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: PageProps) {
  const params = await props.params;

  try {
    console.log("🔍 Fetching product ID:", params.id);

    const response = await prestashopAPI.getProduct(params.id);
    console.log("📦 Response structure:", {
      hasProducts: !!response.products,
      productsType: typeof response.products,
    });

    // Extraction du produit
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
      console.error("❌ Product not found");
      notFound();
    }

    console.log(
      "✅ Product loaded:",
      product.id,
      getLanguageValue(product.name),
    );

    // Extraction des données
    const name = getLanguageValue(product.name) || "Produit sans nom";
    const description = getLanguageValue(product.description) || "";
    const descriptionShort = getLanguageValue(product.description_short) || "";
    const price = product.price || "0";
    const formattedPrice = parseFloat(price).toFixed(2);
    const reference = product.reference || "";
    const isActive =
      product.active === "1" || product.active === 1 || product.active === true;
    const isAvailable =
      product.available_for_order === "1" ||
      product.available_for_order === 1 ||
      product.available_for_order === true;
    const imageName = getLanguageValue(product.link_rewrite); // ✅ Déclaration de imageName

    // ✅ Déclaration de allImages et imageNames DANS la fonction
    const allImages = product.associations?.images || [];
    const imageNames = allImages.map(
      (img: any) => getLanguageValue(img.legend) || imageName,
    );

    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-blue-600 transition-colors"
            >
              Produits
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{name}</span>
          </nav>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Images */}
              <div className="space-y-4">
                <div className="relative h-96 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                  {imageName ? (
                    <ProductImage
                      productId={product.id}
                      imageName={imageName}
                      alt={name}
                      size="large"
                      priority
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <svg
                        className="w-20 h-20 mb-2"
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
                      <p className="text-sm">Aucune image disponible</p>
                      <p className="text-xs mt-2">ID produit: {product.id}</p>
                    </div>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {allImages.slice(0, 5).map((img: any, idx: number) => (
                      <div
                        key={img.id}
                        className="relative h-20 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 hover:border-blue-600 cursor-pointer transition-all"
                      >
                        <ProductImage
                          productId={product.id}
                          imageName={imageNames[idx]}
                          alt={`${name} - Image ${idx + 1}`}
                          size="small"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Détails */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {name}
                  </h1>

                  {reference && (
                    <p className="text-sm text-gray-500">
                      Référence:{" "}
                      <span className="font-medium">{reference}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">ID: {product.id}</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-blue-600">
                    {formattedPrice} €
                  </span>
                </div>
                {descriptionShort && (
                  <div
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: descriptionShort }}
                  />
                )}
                <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50">
                  {isActive && isAvailable ? (
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
                        Produit indisponible
                      </span>
                    </>
                  )}
                </div>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="quantity"
                      className="text-gray-700 font-medium"
                    >
                      Quantité:
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      defaultValue="1"
                      min="1"
                      max="99"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isActive || !isAvailable}
                  >
                    {isActive && isAvailable
                      ? "🛒 Ajouter au panier"
                      : "❌ Produit indisponible"}
                  </button>
                </div>
                <div className="pt-6 border-t border-gray-200 space-y-2 text-sm">
                  {product.ean13 && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">EAN13:</span>
                      <span className="text-gray-800">{product.ean13}</span>
                    </div>
                  )}
                  {product.weight && parseFloat(product.weight) > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 font-medium">Poids:</span>
                      <span className="text-gray-800">{product.weight} kg</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {description && (
              <div className="p-8 border-t border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description détaillée
                </h2>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}
          </div>
          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Retour aux produits
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("❌ Error:", error);
    notFound();
  }
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  try {
    const response = await prestashopAPI.getProduct(params.id);
    const product = (response.products as any)?.product || response.products;

    if (!product) {
      return { title: "Produit introuvable" };
    }

    const name = getLanguageValue(product.name) || "Produit";

    return {
      title: `${name} - Ma Boutique`,
      description: `Découvrez ${name} sur notre boutique en ligne`,
    };
  } catch {
    return {
      title: "Produit introuvable",
    };
  }
}
