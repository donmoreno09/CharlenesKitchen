<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // nullable() — guest orders have no user_id
            // nullOnDelete() — if a user is deleted, preserve their orders
            // (important for business records and audit trails)
            $table->foreignId('user_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // UUID token for guest order lookup.
            // Generated automatically in the Order model's boot() method.
            // nullable because authenticated users don't need it.
            $table->string('guest_token')->nullable()->unique();

            // Snapshot of customer contact details at order time.
            // Stored directly on the order — not fetched from the user profile.
            // This way, if a user updates their name/email, old orders are unaffected.
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone')->nullable();

            // Enum enforces valid state values at the database level.
            // The order lifecycle: pending → confirmed → preparing → ready → delivered
            $table->enum('status', [
                'pending',
                'confirmed',
                'preparing',
                'ready',
                'delivered',
                'cancelled',
            ])->default('pending');

            // Total captured at order time — not recalculated from order_items
            $table->decimal('total_price', 10, 2);

            // Optional delivery instructions or special requests
            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};