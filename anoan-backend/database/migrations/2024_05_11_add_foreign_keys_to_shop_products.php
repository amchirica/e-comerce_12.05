<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('shop_products', function (Blueprint $table) {
            // Add the foreign key columns if they don't exist
            if (!Schema::hasColumn('shop_products', 'brand_id')) {
                $table->foreignId('brand_id')->nullable()->constrained('shop_brands')->cascadeOnDelete();
            }
            if (!Schema::hasColumn('shop_products', 'category_id')) {
                $table->foreignId('category_id')->nullable()->constrained('shop_categories')->cascadeOnDelete();
            }
        });
    }

    public function down()
    {
        Schema::table('shop_products', function (Blueprint $table) {
            $table->dropForeign(['brand_id']);
            $table->dropForeign(['category_id']);
            $table->dropColumn(['brand_id', 'category_id']);
        });
    }
}; 