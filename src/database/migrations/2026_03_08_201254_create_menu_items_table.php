<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();

            // constrained() automatically references categories.id
            // cascadeOnDelete() removes menu items when their category is deleted
            $table->foreignId('category_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');
            $table->text('description')->nullable();

            // decimal(8, 2) stores values up to 999999.99
            // NEVER use float for currency — floats are imprecise by design
            $table->decimal('price', 8, 2);

            // Cloudinary returns a full URL after upload — we store it here
            // nullable because items can exist before an image is added
            $table->string('image_url')->nullable();

            // Cloudinary's internal identifier for the asset.
            // Required if we want to delete or transform the image via API later.
            $table->string('cloudinary_public_id')->nullable();

            // Allows taking an item off the menu without deleting its history
            $table->boolean('is_available')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};