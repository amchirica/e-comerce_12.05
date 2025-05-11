<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::withCount('products')->get();
        return response()->json($brands);
    }

    public function show(Brand $brand)
    {
        return response()->json($brand->load('products'));
    }
} 