"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error("Eroare la încărcarea categoriilor");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (e: any) {
        setError(e.message || "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-2 sm:px-4 md:px-8">
        {/* Breadcrumbs */}
        <div className="bg-muted/50 mb-6">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Acasă
              </Link>
              <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Categorii</span>
            </nav>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center">Categorii Produse</h1>
        <p className="text-center text-gray-600 mb-8">
          Explorează produsele noastre pe categorii
        </p>

        {loading && <div className="text-center py-8">Se încarcă categoriile...</div>}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                <Badge variant="secondary">
                  {category.products_count} produse
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
