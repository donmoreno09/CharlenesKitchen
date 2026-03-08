<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        // Realistic CharlenesKitchen menu data organized by category
        $items = [
            'Starters' => [
                ['name' => 'Garlic Bread',     'price' => 4.99,  'description' => 'Toasted bread with garlic butter and herbs.'],
                ['name' => 'Bruschetta',        'price' => 6.50,  'description' => 'Fresh tomatoes on toasted bread with basil.'],
                ['name' => 'Calamari Fritti',   'price' => 8.99,  'description' => 'Crispy fried squid with marinara sauce.'],
            ],
            'Pasta' => [
                ['name' => 'Spaghetti Carbonara', 'price' => 13.99, 'description' => 'Creamy egg sauce with pancetta and parmesan.'],
                ['name' => 'Penne Arrabbiata',    'price' => 11.99, 'description' => 'Spicy tomato sauce with garlic and chili.'],
                ['name' => 'Tagliatelle al Ragù', 'price' => 14.50, 'description' => 'Slow-cooked Bolognese on fresh egg pasta.'],
            ],
            'Pizza' => [
                ['name' => 'Margherita',          'price' => 11.99, 'description' => 'San Marzano tomato, mozzarella, fresh basil.'],
                ['name' => 'Diavola',             'price' => 13.99, 'description' => 'Spicy salami, mozzarella, chili oil.'],
                ['name' => 'Quattro Formaggi',    'price' => 14.99, 'description' => 'Four cheese blend on a white base.'],
            ],
            'Desserts' => [
                ['name' => 'Tiramisu',    'price' => 6.99, 'description' => 'Classic Italian dessert with mascarpone and coffee.'],
                ['name' => 'Panna Cotta', 'price' => 5.99, 'description' => 'Vanilla cream with mixed berry coulis.'],
            ],
            'Drinks' => [
                ['name' => 'San Pellegrino',    'price' => 2.99, 'description' => 'Sparkling mineral water 500ml.'],
                ['name' => 'Homemade Lemonade', 'price' => 3.99, 'description' => 'Fresh squeezed lemon with mint.'],
            ],
        ];

        foreach ($items as $categoryName => $menuItems) {
            $category = Category::where('name', $categoryName)->first();

            // Guard against missing categories — skip gracefully rather than crash
            if (!$category) continue;

            foreach ($menuItems as $item) {
                MenuItem::firstOrCreate(
                    [
                        'name'        => $item['name'],
                        'category_id' => $category->id,
                    ],
                    [
                        'description'  => $item['description'],
                        'price'        => $item['price'],
                        'is_available' => true,
                    ]
                );
            }
        }
    }
}