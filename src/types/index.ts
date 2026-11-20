export type ProductCategory = 'masculino' | 'feminino' | 'unissex';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  images: string[];
  sizes: number[];
  colors: string[];
  category: ProductCategory;
  badge?: string;
  description: string;
  inStock: boolean;
}
