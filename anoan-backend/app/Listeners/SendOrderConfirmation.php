<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendOrderConfirmation implements ShouldQueue
{
    use InteractsWithQueue;

    public function handle(OrderCreated $event): void
    {
        $order = $event->order;
        $customer = $order->customer;

        Mail::send('emails.order-confirmation', [
            'order' => $order,
            'customer' => $customer,
        ], function ($message) use ($customer) {
            $message->to($customer->email)
                ->subject('Confirmare comandă - Anoan Shop');
        });
    }
} 