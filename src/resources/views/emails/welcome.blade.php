<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Charlene's Kitchen!</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        h1 { color: #c0392b; }
        p { color: #555; line-height: 1.6; }
        .footer { margin-top: 40px; font-size: 12px; color: #aaa; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome, {{ $user->name }}!</h1>
        <p>Thank you for joining <strong>Charlene's Kitchen</strong>. We're thrilled to have you.</p>
        <p>You can now browse our menu and place orders. We hope you enjoy every bite!</p>
        <p>If you have any questions, just reply to this email — we're always happy to help.</p>
        <p>See you at the table,<br><strong>The Charlene's Kitchen Team</strong></p>
        <div class="footer">You're receiving this because you created an account with us.</div>
    </div>
</body>
</html>
