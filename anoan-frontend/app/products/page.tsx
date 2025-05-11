"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { ChevronRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState<number>(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const catRes = await fetch(`${API_URL}/categories`);
        const catData = await catRes.json();
        setCategories(catData.data || catData || []);
        // Find selected category object
        const selectedCatObj = (catData.data || catData || []).find((cat: any) => cat.slug === selectedCategory);
        let url = `${API_URL}/products?page=${page}`;
        if (selectedCategory !== "all") {
          if (selectedCatObj && Array.isArray(selectedCatObj.children) && selectedCatObj.children.length > 0) {
            url += `&parent_category_slug=${selectedCategory}`;
          } else {
            url += `&category_slug=${selectedCategory}`;
          }
        }
        const prodRes = await fetch(url);
        const brandRes = await fetch(`${API_URL}/brands`);
        const prodData = await prodRes.json();
        const brandData = await brandRes.json();
        setProducts(prodData.data || []);
        setMeta(prodData.meta || null);
        setBrands(brandData.data || brandData || []);
      } catch (e: any) {
        setError(e.message || "Eroare necunoscută");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [page, selectedCategory]);

  // Filtrare locală
  const filteredProducts = products.filter((product) => {
    const catOk =
      selectedCategory === "all" ||
      (product.category && product.category.slug && product.category.slug === selectedCategory) ||
      (Array.isArray(product.categories) && product.categories.some((cat: { slug: string }) => cat.slug === selectedCategory));
    const brandOk =
      selectedBrand === "all" ||
      (product.brand && product.brand.id && product.brand.id.toString() === selectedBrand);
    const price = parseFloat(product.price || "0");
    const minOk = !minPrice || price >= parseFloat(minPrice);
    const maxOk = !maxPrice || price <= parseFloat(maxPrice);
    return catOk && brandOk && minOk && maxOk;
  });

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
              <span className="font-medium">Produse</span>
            </nav>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2 text-center">Toate Produsele</h1>
        <p className="text-center text-gray-600 mb-8">
          Din cele mai alese produse pntru tine si familia ta
        </p>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* FILTRE */}
          <aside className="md:w-64 w-full max-w-md md:max-w-xs md:mx-0 mx-auto md:block">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Categorii</h3>
              <div>
                <label className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                  />
                  Toate categoriile
                </label>
                {categories.map((cat: any) => (
                  <label key={cat.id} className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="category"
                      value={cat.slug}
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Branduri</h3>
              <div>
                <label className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="brand"
                    value="all"
                    checked={selectedBrand === "all"}
                    onChange={() => setSelectedBrand("all")}
                  />
                  Toate brandurile
                </label>
                {brands.map((brand: any) => (
                  <label key={brand.id} className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="brand"
                      value={brand.id}
                      checked={selectedBrand === brand.id.toString()}
                      onChange={() => setSelectedBrand(brand.id.toString())}
                    />
                    {brand.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Preț</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full sm:w-1/2 border rounded px-2 py-1"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full sm:w-1/2 border rounded px-2 py-1"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
          </aside>
          <div className="flex-1" />
        </div>
        {/* LISTARE PRODUSE */}
        <section className="flex-1">
          {loading && <div className="text-center py-8">Se încarcă produsele...</div>}
          {error && <div className="text-center py-8 text-red-500">{error}</div>}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow flex flex-col h-full">
                    <Link href={`/products/${product.slug || product.id}`} className="flex-1 flex flex-col">
                      <div className="relative w-full h-48">
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
                      <div className="p-4 flex-1 flex flex-col">
                        <h2 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h2>
                        <div className="flex items-center justify-between mb-2">
                          {product.category?.name ? (
                            <Badge variant="secondary">{product.category.name}</Badge>
                          ) : (
                            <span className="text-xs text-gray-400">Categorie: -</span>
                          )}
                          <span className="font-bold text-primary">{product.price} lei</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-1">Brand: {product.brand?.name || "-"}</div>
                        <div className="text-sm text-gray-500 mb-1">SKU: {product.sku}</div>
                        <div className="text-sm text-gray-500 mb-1">Stoc: {product.qty ?? product.quantity ?? "-"}</div>
                        <div className="text-xs text-gray-400 mt-auto">ID produs: {product.id}</div>
                      </div>
                    </Link>
                    <div className="p-4 pt-0">
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() =>
                          addItem({
                            id: product.id,
                            name: product.name,
                            price: Number(product.price),
                            quantity: 1,
                            image: product.image_url || "",
                            slug: product.slug,
                            sku: product.sku,
                          })
                        }
                      >
                        Adaugă în Coș
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {/* PAGINARE */}
              {meta && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    disabled={meta.current_page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    &lt; Anterior
                  </Button>
                  <span className="text-sm">
                    Pagina {meta.current_page} din {meta.last_page}
                  </span>
                  <Button
                    variant="outline"
                    disabled={meta.current_page === meta.last_page}
                    onClick={() => setPage((p) => Math.min(meta.last_page, p + 1))}
                  >
                    Următoarea &gt;
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </MainLayout>
  );
}