<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $ADMIN_PASSWORD = 'admin2023';

        User::create([
            'name' => 'admin',
            'email' => 'admin@poodfanda.com',
            'password' => Hash::make($ADMIN_PASSWORD),
            'type' => 'admin'
        ]);

        $categories = ['Spicy', 'Italian', 'Pizza', 'Kebab', 'Gyros', 'Chinese', 'Hamburger', 'Fast food', 'American'];
        foreach ($categories as $cat)
        {
            Category::create(['name' => $cat]);
        }
    }
}
