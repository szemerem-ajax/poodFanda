<?php

use App\Http\Controllers\ProfileController;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->get('/dashboard', fn (Request $request) =>
    Inertia::render(match ($request->user()?->type) {
        'user' => 'Customer/Dashboard',
        'restaurant' => 'Restaurant/Dashboard',
        'courier' => 'Courier/Dashboard',
        'admin' => 'Admin/Dashboard',
        default => 'Landing'
    })
)->name('dashboard');

Route::middleware('role:restaurant')->group(function () {
    Route::get('/items', fn() => Inertia::Render('Restaurant/Items'))
        ->name('items');
});

Route::middleware('role:courier')->group(function() {
});

Route::middleware('role:user')->group(function() {
    Route::get('/myorders', fn () => Inertia::render('Customer/MyOrders'))
        ->name('myorders');
});

Route::get('/', fn (Request $request) =>
    match ($request->user()) {
        null => Inertia::render('Landing'),
        default => redirect('/dashboard')
    }
)->name('landing');

// Route::get('/', function () {
//     return Inertia::render('Landing');
// });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/test', function () {
    return Food::all();
});

require __DIR__.'/auth.php';
