<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class MenuItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            // Pick a random existing category, or create one if none exist.
            // The null-safe operator ?-> handles the case where no categories exist yet.
            'category_id'  => Category::inRandomOrder()->first()?->id
                            ?? Category::factory(),
            'name'         => fake()->words(3, true),
            'description'  => fake()->sentence(),
            'price'        => fake()->randomFloat(2, 4.99, 29.99),
            // image_url is null here — real images come via Cloudinary in Phase 3
            'image_url'             => null,
            'cloudinary_public_id'  => null,
            'is_available'          => true,
        ];
    }
}