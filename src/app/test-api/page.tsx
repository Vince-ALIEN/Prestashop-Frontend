// src/app/test-api/page.tsx
export default async function TestAPI() {
  const apiUrl = process.env.PRESTASHOP_API_URL;
  const apiKey = process.env.PRESTASHOP_API_KEY;
  
  if (!apiUrl || !apiKey) {
    return (
      <div className="p-8 bg-red-50">
        <h1 className="text-2xl font-bold text-red-600">❌ Configuration manquante</h1>
        <p className="mt-4">Vérifiez votre fichier .env.local</p>
      </div>
    );
  }

  try {
    const url = `${apiUrl}/products?ws_key=${apiKey}&output_format=JSON&limit=3`;
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      return (
        <div className="p-8 bg-red-50">
          <h1 className="text-2xl font-bold text-red-600">❌ Erreur API</h1>
          <p className="mt-4">Status: {response.status} {response.statusText}</p>
          <p className="mt-2 text-sm">URL: {url.replace(apiKey, 'HIDDEN')}</p>
        </div>
      );
    }

    const data = await response.json();

    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-green-600 mb-4">✅ API fonctionne !</h1>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 bg-red-50">
        <h1 className="text-2xl font-bold text-red-600">❌ Erreur</h1>
        <p className="mt-4">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}