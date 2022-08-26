import React, { useState, useEffect } from 'react';
import { apiCall } from 'http/index';
import { useAsync } from 'utils/async';
import { Loader } from 'components/Loader';

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

type ProductsContextProps = {
  products: Product[];
  loading: boolean;
};

export const ProductsContext = React.createContext<undefined | ProductsContextProps>(undefined);

export default function ProductsProvider(props: { children: JSX.Element | JSX.Element[] }) {
  // const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);

  const { data: savedProducts, loading } = useAsync(getAllProducts);

  useEffect(() => {
    if (!savedProducts) {
      return;
    }
    setProducts(savedProducts);
  }, [savedProducts]);

  if (loading) {
    return <Loader />;
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = React.useContext(ProductsContext);

  if (!context) {
    throw new Error('useProducts must be used within ProductsProvider');
  }

  return context;
}

async function getAllProducts() {
  return apiCall<Product[]>({ method: 'GET', url: '/product' });
}

async function createProduct(data: Omit<Product, 'productId'>) {
  return apiCall<Product>({ method: 'POST', url: '/product', data });
}

async function updateProduct(id: number, data: Product) {
  return apiCall<Product>({ method: 'PUT', url: `/pipeline/${id}`, data });
}

async function deleteProduct(id: number) {
  return apiCall<boolean>({ method: 'DELETE', url: `/pipeline/${id}` });
}
