'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductActions } from '@/hooks/use-products';
import { ProductForm } from '@/components/product/product-form';
import { useToast } from '@/components/ui/use-toast';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const { fetchProduct, editProduct } = useProductActions();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, categoriesRes, brandsRes] = await Promise.all([
          fetchProduct(parseInt(params.id)),
          fetch('/api/categories'),
          fetch('/api/brands'),
        ]);

        if (!categoriesRes.ok || !brandsRes.ok) {
          throw new Error('Failed to load data');
        }

        const [categoriesData, brandsData] = await Promise.all([
          categoriesRes.json(),
          brandsRes.json(),
        ]);

        setProduct(productRes);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load product data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    try {
      await editProduct(parseInt(params.id), data);
      router.push('/admin/products');
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          categories={categories}
          brands={brands}
        />
      </div>
    </div>
  );
} 