<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Starters',  'sort_order' => 1],
            ['name' => 'Pasta',     'sort_order' => 2],
            ['name' => 'Pizza',     'sort_order' => 3],
            ['name' => 'Grills',    'sort_order' => 4],
            ['name' => 'Salads',    'sort_order' => 5],
            ['name' => 'Desserts',  'sort_order' => 6],
            ['name' => 'Drinks',    'sort_order' => 7],
        ];

        foreach ($categories as $category) {
            // firstOrCreate() looks for a record matching the first array.
            // If found, returns it. If not, creates it with the merged arrays.
            // This makes the seeder IDEMPOTENT — safe to run multiple times
            // without creating duplicate records.
            Category::firstOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name'       => $category['name'],
                    'sort_order' => $category['sort_order'],
                    'is_active'  => true,
                ]
            );
        }
    }
}