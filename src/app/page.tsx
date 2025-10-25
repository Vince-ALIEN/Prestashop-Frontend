// src/app/page.tsx
import ProductList from "@/components/ProductList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProductList />
      </div>
    </main>
  );
}
