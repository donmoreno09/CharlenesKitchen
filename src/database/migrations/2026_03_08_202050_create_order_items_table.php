<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();

            // If an order is deleted, delete all its line items too
            $table->foreignId('order_id')
                ->constrained()
                ->cascadeOnDelete();

            // If a menu item is deleted, set this to null — not cascade.
            // We still have the name and price stored below as snapshots.
            $table->foreignId('menu_item_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            // ── Price & Name Snapshot Pattern ────────────────────────────────
            // These two columns are the most important design decision here.
            //
            // We store the item's name and price AT THE TIME OF ORDERING.
            // This means historical orders are immutable records of truth —
            // menu price changes, renames, or deletions don't corrupt them.
            //
            // This is standard practice in any e-commerce system.
            $table->string('menu_item_name');
            $table->decimal('unit_price', 8, 2);

            $table->unsignedInteger('quantity');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};