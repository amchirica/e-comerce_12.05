"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';
import Image from "next/image";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart/cart-provider';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const { toast } = useToast();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error("Eroare la încărcarea produsului");
        const data = await res.json();
        let found = null;
        if (data.data && Array.isArray(data.data)) {
          found = data.data.find((p: any) => p.slug === slug || p.id == slug);
        }
        if (!found) throw new Error("Produsul nu a fost găsit");
        setProduct(found);
      } catch (e: any) {
        setError(e.message || "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.image_url || "",
      slug: product.slug,
      sku: product.sku,
    });
    toast({
      title: "Adăugat în coș",
      description: `${product.name} a fost adăugat în coșul tău.`,
    });
  };

  return (
    <MainLayout>
      {loading && <div className="p-8 text-center">Se încarcă detaliile produsului...</div>}
      {error && <div className="p-8 text-center text-red-500">{error}</div>}
      {!loading && !error && product && (
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagine produs */}
            <div className="relative h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
              {product.image_url && !product.image_url.includes('placeholder.png') ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="400px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/400x300?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Fără imagine</div>
              )}
                </div>
            {/* Detalii produs */}
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.category?.name || "Fără categorie"}</Badge>
                <Badge variant="outline">{product.brand?.name || "Fără brand"}</Badge>
              </div>
              <div className="text-2xl font-semibold text-primary">{product.price} lei</div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-1">Descriere</h3>
                <div className="text-gray-700 whitespace-pre-line break-words max-w-full overflow-hidden">
                  {product.description}
            </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                <div><span className="font-medium">SKU:</span> {product.sku}</div>
                <div><span className="font-medium">Stoc:</span> {product.qty ?? product.quantity ?? "-"}</div>
                <div><span className="font-medium">ID:</span> {product.id}</div>
                <div><span className="font-medium">Barcode:</span> {product.barcode || '-'}</div>
              </div>
              <div className="mt-6">
                <Button className="w-full" variant="default" onClick={handleAddToCart}>
                  Adaugă în Coș
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}