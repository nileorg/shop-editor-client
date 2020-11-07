import { Product } from '@/store/types';
import makeRequest from './makeRequest';

export default async (authenticationToken: string): Promise<Product[]> => {
  const products = await makeRequest('/shop', { authenticationToken });
  return products as Product[];
};
