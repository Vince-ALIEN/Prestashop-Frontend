// src/lib/prestashop.ts
import type { 
  PrestaShopProductResponse, 
  PrestaShopProductsResponse,
  PrestaShopCategoryResponse,
  PrestaShopCategoriesResponse 
} from './types';

export interface PrestaShopConfig {
  apiUrl: string;
  apiKey: string;
}

export class PrestaShopAPI {
  private apiUrl: string;
  private apiKey: string;

  constructor(config: PrestaShopConfig) {
    this.apiUrl = config.apiUrl.replace(/\/$/, '');
    this.apiKey = config.apiKey;
  }

  private buildUrl(resource: string, id?: string | number, params?: Record<string, any>): string {
    let url = `${this.apiUrl}/${resource}`;
    if (id) url += `/${id}`;
    
    const queryParams = new URLSearchParams({
      ws_key: this.apiKey,
      output_format: 'JSON',
      ...params
    });
    
    return `${url}?${queryParams.toString()}`;
  }

  // GET générique avec type
  async get<T>(resource: string, id?: string | number, options?: {
    display?: string;
    filter?: Record<string, any>;
    sort?: string;
    limit?: string;
  }): Promise<T> {
    const url = this.buildUrl(resource, id, options);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      next: { revalidate: 60 } // Cache 60 secondes
    });

    if (!response.ok) {
      throw new Error(`PrestaShop API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Méthodes typées spécifiques
  // src/lib/prestashop.ts

async getProducts(options?: { 
  limit?: number; 
  page?: number;
}): Promise<PrestaShopProductsResponse> {
  const limit = options?.limit || 10;
  const offset = options?.page ? (options.page - 1) * limit : 0;
  
  const url = this.buildUrl('products', undefined, {
    display: 'full', // ✅ Récupérer tous les champs
    limit: `${offset},${limit}`,
    // ✅ AJOUT : Forcer le retour des associations
  });
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`PrestaShop API error: ${response.status}`);
  }

  const data = await response.json();
  
  // ✅ DEBUG : Voir ce que l'API retourne
  console.log('🔍 API Response sample:', {
    firstProduct: data.products ? Object.values(data.products)[0] : null,
  });

  return data;
}

  async getProduct(id: string | number): Promise<PrestaShopProductResponse> {
    return this.get<PrestaShopProductResponse>('products', id, { 
      display: 'full' 
    });
  }

  async getCategories(): Promise<PrestaShopCategoriesResponse> {
    return this.get<PrestaShopCategoriesResponse>('categories', undefined, { 
      display: 'full' 
    });
  }

  async getCategory(id: string | number): Promise<PrestaShopCategoryResponse> {
    return this.get<PrestaShopCategoryResponse>('categories', id, { 
      display: 'full' 
    });
  }

  // POST, PUT, DELETE restent pareils...
}

// Instance singleton
export const prestashopAPI = new PrestaShopAPI({
  apiUrl: process.env.PRESTASHOP_API_URL!,
  apiKey: process.env.PRESTASHOP_API_KEY!
});