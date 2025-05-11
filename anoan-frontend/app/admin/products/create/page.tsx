'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProductActions } from '@/hooks/use-products';
import { ProductForm } from '@/components/product/product-form';
import { useToast } from '@/components/ui/use-toast';

export default function CreateProductPage() {
  const router = useRouter();
  const { createProduct } = useProductActions();
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
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

        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load categories and brands',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      await createProduct(data);
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

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Product</h1>
        <ProductForm
          onSubmit={handleSubmit}
          categories={categories}
          brands={brands}
        />
      </div>
    </div>
  );
} 