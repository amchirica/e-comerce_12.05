import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const fetchWithError = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  old_price?: string;
  sku: string;
  barcode?: string;
  qty: number;
  security_stock: number;
  featured: boolean;
  is_visible: boolean;
  backorder: boolean;
  requires_shipping: boolean;
  published_at: string;
  image?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  brand?: {
    id: number;
    name: string;
    slug: string;
    website?: string;
    description?: string;
  };
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearProducts: () => void;
}

export const useProducts = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),
      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      clearProducts: () => set({ products: [] }),
    }),
    {
      name: 'products-storage',
    }
  )
);

export const useProductActions = () => {
  const { setProducts, addProduct, updateProduct, removeProduct } = useProducts();

  const fetchProducts = async (params?: {
    search?: string;
    category?: number;
    brand?: number;
  }) => {
    try {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.category) queryParams.append('category_id', params.category.toString());
      if (params?.brand) queryParams.append('brand_id', params.brand.toString());

      console.log('Fetching products from:', `${API_URL}/products?${queryParams.toString()}`);
      
      const response = await fetchWithError(`${API_URL}/products?${queryParams.toString()}`);
      const data = await response.json();
      
      console.log('Products API Response:', data);
      
      if (!data.data) {
        console.error('No data property in response:', data);
        setProducts([]);
        return data;
      }
      
      setProducts(data.data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      throw error;
    }
  };

  const fetchProduct = async (id: number) => {
    try {
      const response = await fetchWithError(`${API_URL}/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };

  const createProduct = async (productData: Partial<Product>) => {
    try {
      const response = await fetchWithError(`${API_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      addProduct(data);
      return data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };

  const editProduct = async (id: number, productData: Partial<Product>) => {
    try {
      const response = await fetchWithError(`${API_URL}/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      });
      const data = await response.json();
      updateProduct(data);
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await fetchWithError(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      });
      removeProduct(id);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  return {
    fetchProducts,
    fetchProduct,
    createProduct,
    editProduct,
    deleteProduct,
  };
}; 