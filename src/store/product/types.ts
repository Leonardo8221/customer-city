export interface Product {
  productId: number;
  productName: string;
  description: string;
  category: ProductCategory;
  rateChargeType: ProductRateChargeType;
  price: number;
  currency: string;
  createDate: Date;
}

export interface ProductState {
  loading: boolean;
  error: boolean | string;
  success: boolean | string;
  products: Product[];
}

export interface ProductReturnHook extends ProductState {
  setError: (error: string | boolean) => void;
  setSuccess: (success: string | boolean) => void;
  getProducts: () => void;
}

export enum ProductCategory {
  BASE_PRODUCT = 'base',
  ADD_ON = 'add-on',
  MISC_PRODUCT = 'misc',
}

export enum ProductRateChargeType {
  ONE_TIME = 'one-time',
  RECURRING = 'recurring',
  USAGE = 'usage',
}

export enum ProductCurrency {
  USD = 'USD',
}
