'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';

interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  products_count: number;
}

export default function BrandsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const response = await fetch('/api/brands');
        if (!response.ok) throw new Error('Failed to load brands');
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load brands',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Brands</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link href={`/brands/${brand.slug}`} key={brand.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={brand.image_url}
                    alt={brand.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle>{brand.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-2">
                  {brand.products_count} products
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 