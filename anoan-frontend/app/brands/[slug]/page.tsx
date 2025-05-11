'use client';

import { useEffect, useState } from 'react';
import { useProducts, useProductActions } from '@/hooks/use-products';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface BrandDetailsPageProps {
  params: {
    slug: string;
  };
}

export default function BrandDetailsPage({ params }: BrandDetailsPageProps) {
  const { products } = useProducts();
  const { fetchProducts } = useProductActions();
  const { toast } = useToast();
  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandRes, productsRes] = await Promise.all([
          fetch(`/api/brands/${params.slug}`),
          fetchProducts({ brand: brand?.id }),
        ]);

        if (!brandRes.ok) throw new Error('Failed to load brand');
        const brandData = await brandRes.json();
        setBrand(brandData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load brand data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Brand not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        {brand.description && (
          <p className="text-gray-600 mt-2">{brand.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.slug}`} key={product.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                <div className="mt-2 flex items-center justify-between">
                  <Badge variant="secondary">{product.category?.name}</Badge>
                  <span className="font-semibold">${product.price}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 