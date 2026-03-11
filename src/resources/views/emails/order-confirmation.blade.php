<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmed — Charlene's Kitchen</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        h1 { color: #c0392b; }
        p { color: #555; line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f2f2f2; text-align: left; padding: 10px; font-size: 13px; color: #333; }
        td { padding: 10px; border-bottom: 1px solid #eee; color: #555; font-size: 14px; }
        .total-row td { font-weight: bold; color: #333; border-top: 2px solid #ddd; border-bottom: none; }
        .footer { margin-top: 40px; font-size: 12px; color: #aaa; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Confirmed!</h1>
        <p>Hi <strong>{{ $order->customer_name }}</strong>, thank you for your order at <strong>Charlene's Kitchen</strong>.</p>
        <p>Your order <strong>#{{ $order->id }}</strong> has been received and is now <strong>{{ ucfirst($order->status) }}</strong>.</p>
        <table>
            <thead>
                <tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
                @foreach ($order->orderItems as $item)
                <tr>
                    <td>{{ $item->menu_item_name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>${{ number_format($item->unit_price, 2) }}</td>
                    <td>${{ number_format($item->subtotal, 2) }}</td>
                </tr>
                @endforeach
                <tr class="total-row">
                    <td colspan="3">Total</td>
                    <td>${{ number_format($order->total_price, 2) }}</td>
                </tr>
            </tbody>
        </table>
        @if ($order->notes)
        <p><strong>Notes:</strong> {{ $order->notes }}</p>
        @endif
        @if ($order->isGuest())
        <p>Track your order with token: <strong>{{ $order->guest_token }}</strong></p>
        @endif
        <p>Thank you for choosing Charlene's Kitchen!</p>
        <p>See you at the table,<br><strong>The Charlene's Kitchen Team</strong></p>
        <div class="footer">You're receiving this because you placed an order with us.</div>
    </div>
</body>
</html>