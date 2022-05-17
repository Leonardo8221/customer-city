export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productRateChargeType: string;
  productPrice: number;
  productCurrency: string;
  productCreatedAt: string;
  productUpdatedAt: string;
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
