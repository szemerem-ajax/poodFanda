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

Route::middleware('role:restaurant')->group(function () {
    Route::get('/', fn() => Inertia::Render('Restaurant/Dashboard'))
        ->name('dashboard');
});

Route::middleware('role:courier')->group(function() {
    Route::get('/', fn() => Inertia::render('Courier/Dashboard'))
        ->name('dashboard');
});

Route::middleware('role:user')->group(function() {
    Route::get('/', fn() => Inertia::render('User/Dashboard'))
        ->name('dashboard');
});

Route::get('/', fn (Request $request) =>
    Inertia::render(match ($request->user()?->type) {
        'user' => 'Dashboard_User',
        'restaurant' => 'Restaurant/Dashboard',
        'courier' => 'Dashboard_Courier',
        default => 'Landing'
    })
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
