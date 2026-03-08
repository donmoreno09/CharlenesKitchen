<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Order matters — CategorySeeder must run before MenuItemSeeder
        // because menu items have a foreign key to categories.
        // Running MenuItemSeeder first would cause a constraint violation.
        $this->call([
            CategorySeeder::class,
            MenuItemSeeder::class,
        ]);
    }
}