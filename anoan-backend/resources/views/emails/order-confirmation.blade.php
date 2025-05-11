<!DOCTYPE html>
<html>
<head>
    <title>Confirmare comandă - Anoan Shop</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .order-details {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Mulțumim pentru comandă!</h1>
        </div>

        <p>Dragă {{ $customer->name }},</p>

        <p>Comanda ta a fost primită și este în curs de procesare. Iată detaliile comenzii:</p>

        <div class="order-details">
            <h2>Detalii comandă #{{ $order->id }}</h2>
            <p><strong>Data:</strong> {{ $order->created_at->format('d.m.Y H:i') }}</p>
            <p><strong>Total:</strong> {{ number_format($order->total, 2) }} RON</p>
            <p><strong>Status:</strong> {{ ucfirst($order->status) }}</p>
        </div>

        <p>Vei primi un email când comanda ta va fi expediată.</p>

        <p>Dacă ai întrebări, te rugăm să ne contactezi la support@anoan.ro</p>

        <div class="footer">
            <p>© {{ date('Y') }} Anoan Shop. Toate drepturile rezervate.</p>
        </div>
    </div>
</body>
</html> 