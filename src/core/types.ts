export enum UserRole {
  SUPER_AMIN = 'super_admin',
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

export interface OptionValue<T> {
  label: string;
  value: T;
}

export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productCategory: string;
  productRateChargeType: string;
  productPrice: number;
  productCurrency: string;
  createdAt: string;
  updatedAt: string;
}
