<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'brand']);

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($request->has('category_slug')) {
            $category = \App\Models\Shop\Category::where('slug', $request->get('category_slug'))->first();
            if ($category) {
                $ids = [$category->id];
                // If category has children, include their ids
                if ($category->children()->exists()) {
                    $ids = array_merge($ids, $category->children()->pluck('id')->toArray());
                }
                $query->where(function ($q) use ($ids) {
                    $q->whereIn('category_id', $ids)
                      ->orWhereHas('categories', function ($q2) use ($ids) {
                          $q2->whereIn('shop_categories.id', $ids);
                      });
                });
            }
        }

        if ($request->has('category_id')) {
            $query->where('category_id', $request->get('category_id'));
        }

        if ($request->has('brand_id')) {
            $query->where('brand_id', $request->get('brand_id'));
        }

        if ($request->has('parent_category_slug')) {
            $parent = \App\Models\Shop\Category::where('slug', $request->get('parent_category_slug'))->first();
            if ($parent) {
                $childIds = $parent->children()->pluck('id')->toArray();
                if (!empty($childIds)) {
                    $query->where(function ($q) use ($childIds) {
                        $q->whereIn('category_id', $childIds)
                          ->orWhereHas('categories', function ($q2) use ($childIds) {
                              $q2->whereIn('shop_categories.id', $childIds);
                          });
                    });
                } else {
                    // fallback: if no children, filter by parent itself
                    $query->where(function ($q) use ($parent) {
                        $q->where('category_id', $parent->id)
                          ->orWhereHas('categories', function ($q2) use ($parent) {
                              $q2->whereIn('shop_categories.id', [$parent->id]);
                          });
                    });
                }
            }
        }

        $products = $query->paginate(20);

        $data = $products->getCollection()->transform(function ($product) {
            $product->image_url = $product->getFirstMediaUrl('product-images', 'thumb') ?: asset('placeholder.png');
            unset($product->media); // nu trimite obiecte media
            return $product;
        });

        return response()->json([
            'data' => $data,
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }

    public function show(Product $product)
    {
        $product->load(['category', 'brand']);
        $product->image_url = $product->getFirstMediaUrl('product-images', 'thumb') ?: asset('placeholder.png');
        unset($product->media);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:shop_products',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'cost_per_item' => 'nullable|numeric|min:0',
            'sku' => 'required|string|max:255|unique:shop_products',
            'barcode' => 'nullable|string|max:255',
            'quantity' => 'required|integer|min:0',
            'security_stock' => 'nullable|integer|min:0',
            'status' => 'required|boolean',
            'category_id' => 'required|exists:shop_categories,id',
            'brand_id' => 'nullable|exists:shop_brands,id',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'gallery.*' => 'string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:shop_products,slug,' . $product->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'compare_at_price' => 'nullable|numeric|min:0',
            'cost_per_item' => 'nullable|numeric|min:0',
            'sku' => 'required|string|max:255|unique:shop_products,sku,' . $product->id,
            'barcode' => 'nullable|string|max:255',
            'quantity' => 'required|integer|min:0',
            'security_stock' => 'nullable|integer|min:0',
            'status' => 'required|boolean',
            'category_id' => 'required|exists:shop_categories,id',
            'brand_id' => 'nullable|exists:shop_brands,id',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'gallery.*' => 'string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
} 