<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Shop\Customer;
use App\Models\Shop\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $request->validate([
            'user' => ['required', 'array'],
            'user.name' => ['required', 'string', 'max:255'],
            'user.email' => ['required', 'string', 'email', 'max:255'],
            'user.phone' => ['required', 'string', 'max:20'],
        ]);

        try {
            DB::beginTransaction();

            // Get or create customer
            $customer = null;
            if ($request->user()->id) {
                $customer = $request->user();
            } else {
                $customer = Customer::firstOrCreate(
                    ['email' => $request->user['email']],
                    [
                        'name' => $request->user['name'],
                        'phone' => $request->user['phone'],
                        'password' => bcrypt(str_random(10)),
                    ]
                );
            }

            // Create order
            $order = Order::create([
                'customer_id' => $customer->id,
                'status' => 'pending',
                'total' => 0, // Will be updated with items
            ]);

            // Add items to order
            // TODO: Add cart items to order

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order' => $order->load('items'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create order'], 500);
        }
    }
} 