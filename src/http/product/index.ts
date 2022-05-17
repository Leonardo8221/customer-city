import { Product } from 'store/product/types';
import { apiCall } from '../index';

export const createProduct = (data: Partial<Product>): Promise<Product> =>
  apiCall({ method: 'post', url: '/product', data });

export const getProducts = (): Promise<Product[]> => apiCall({ method: 'get', url: '/product' });

export const updateProduct = (id: number, data: Partial<Product>): Promise<null> =>
  apiCall({ method: 'put', url: `/product/${id}`, data });

export const deleteProduct = (id: number): Promise<null> => apiCall({ method: 'delete', url: `/product/${id}` });
