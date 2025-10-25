// src/lib/types.ts

export interface Product {
  id: number;
  id_manufacturer: number;
  id_supplier: number;
  id_category_default: number;
  id_tax_rules_group: number;
  id_default_image?: string;
  type: string;
  reference: string;
  supplier_reference: string;
  ean13: string;
  isbn: string;
  upc: string;
  mpn: string;
  ecotax: string;
  wholesale_price: string;
  price: string;
  unit_price_ratio: string;
  additional_shipping_cost: string;
  unity: string;
  unit_price: string;
  weight: string;
  width: string;
  height: string;
  depth: string;
  out_of_stock: string;
  additional_delivery_times: string;
  quantity_discount: string;
  customizable: string;
  uploadable_files: string;
  text_fields: string;
  active: string;
  redirect_type: string;
  id_type_redirected: string;
  available_for_order: string;
  available_date: string;
  show_condition: string;
  condition: string;
  show_price: string;
  indexed: string;
  visibility: string;
  cache_is_pack: string;
  cache_has_attachments: string;
  is_virtual: string;
  cache_default_attribute: string;
  date_add: string;
  date_upd: string;
  advanced_stock_management: string;
  pack_stock_type: string;
  state: string;
  product_type: string;
  
  name: string | LanguageField[];
  description: string | LanguageField[];
  description_short: string | LanguageField[];
  link_rewrite: string | LanguageField[];
  meta_description: string | LanguageField[];
  meta_keywords: string | LanguageField[];
  meta_title: string | LanguageField[];
  available_now: string | LanguageField[];
  available_later: string | LanguageField[];
  delivery_in_stock: string | LanguageField[];
  delivery_out_stock: string | LanguageField[];
  
  associations?: {
    categories?: Array<{ id: string }>;
    images?: Array<{ id: string }>;
    combinations?: Array<{ id: string }>;
    product_option_values?: Array<{ id: string }>;
    product_features?: Array<{ id: string; id_feature_value: string }>;
    tags?: Array<{ id: string }>;
    stock_availables?: Array<{ id: string; id_product_attribute: string }>;
    accessories?: Array<{ id: string }>;
    product_bundle?: Array<{ id: string; quantity: string }>;
  };
}

export interface LanguageField {
  id: number;
  value: string;
}

export interface PrestaShopProductResponse {
  products: Product | { product: Product }; 
}

export interface PrestaShopProductsResponse {
  products: Product[] | { [key: string]: Product };
}


export interface Category {
  id: number;
  id_parent: number;
  level_depth: number;
  nb_products_recursive: number;
  active: string;
  id_shop_default: string;
  is_root_category: string;
  position: string;
  date_add: string;
  date_upd: string;
  name: string | LanguageField[];
  description: string | LanguageField[];
  link_rewrite: string | LanguageField[];
  meta_title: string | LanguageField[];
  meta_description: string | LanguageField[];
  meta_keywords: string | LanguageField[];
  associations?: {
    products?: Array<{ id: string }>;
  };
}

export interface PrestaShopCategoryResponse {
  category: Category;
}

export interface PrestaShopCategoriesResponse {
  categories: Category[] | { [key: string]: Category };
}