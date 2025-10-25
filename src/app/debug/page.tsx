// src/app/debug/page.tsx
import { prestashopAPI } from '@/lib/prestashop';

export default async function DebugPage() {
  let productsData = null;
  let productsError = null;

  try {
    productsData = await prestashopAPI.getProducts({ limit: 5 });
  } catch (error) {
    productsError = error instanceof Error ? error.message : String(error);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Diagnostic API</h1>

        {/* Configuration */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Configuration</h2>
          <div className="space-y-2 text-sm">
            <p>API URL: {process.env.PRESTASHOP_API_URL || '❌ Non défini'}</p>
            <p>API Key: {process.env.PRESTASHOP_API_KEY ? '✅ Définie' : '❌ Non définie'}</p>
          </div>
        </div>

        {/* Résultat */}
        {productsError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">❌ Erreur</h2>
            <p className="text-red-700">{productsError}</p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-800 mb-4">✅ API fonctionne</h2>
            <pre className="bg-white p-4 rounded overflow-auto text-xs">
              {JSON.stringify(productsData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}