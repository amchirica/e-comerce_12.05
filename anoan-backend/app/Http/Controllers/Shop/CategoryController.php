<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')
            ->select(['id', 'name', 'slug'])
            ->get();
            
        return response()->json([
            'data' => $categories
        ]);
    }

    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->with(['products' => function ($query) {
                $query->with(['category', 'brand']);
            }])
            ->firstOrFail();

        $products = $category->products()
            ->with(['category', 'brand'])
            ->paginate(20);

        $data = $products->getCollection()->transform(function ($product) {
            $product->image_url = $product->getFirstMediaUrl('product-images', 'thumb') ?: asset('placeholder.png');
            unset($product->media);
            return $product;
        });

        return response()->json([
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
            ],
            'data' => $data,
            'meta' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
            ],
        ]);
    }
} 