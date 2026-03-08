<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            // Auto-incrementing UNSIGNED BIGINT primary key
            $table->id();

            // e.g. "Pasta", "Desserts", "Drinks"
            $table->string('name');

            // URL-friendly version: "pasta", "desserts", "drinks"
            // unique() adds a database-level uniqueness constraint
            $table->string('slug')->unique();

            // Controls display order — allows manual sorting without
            // relying on insertion order or alphabetical sorting
            $table->unsignedInteger('sort_order')->default(0);

            // Soft toggle — hide a category without deleting its menu items
            $table->boolean('is_active')->default(true);

            // created_at and updated_at columns, managed by Laravel automatically
            $table->timestamps();
        });
    }

    // down() is the rollback — it must perfectly reverse what up() did
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};