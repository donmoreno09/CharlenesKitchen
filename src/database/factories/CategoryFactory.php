<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CategoryFactory extends Factory
{
    // definition() returns the default set of attribute values for the model.
    // fake() provides access to Faker — a library for generating realistic fake data.
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Starters', 'Pasta', 'Pizza', 'Grills',
            'Desserts', 'Drinks', 'Salads', 'Sides',
        ]);

        return [
            'name'       => $name,
            // Str::slug() converts "Pasta & Sauces" → "pasta-sauces"
            'slug'       => Str::slug($name),
            'sort_order' => fake()->numberBetween(1, 10),
            'is_active'  => true,
        ];
    }
}