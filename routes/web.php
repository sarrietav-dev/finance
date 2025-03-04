<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Overview');
})->middleware(['auth', 'verified'])->name('overview');

Route::inertia('/pots', 'Pots')->name('pots');
Route::inertia('/transactions', 'Transactions')->name('transactions');
Route::inertia('/budgets', 'Budgets')->name('budgets');
Route::inertia('/bills', 'Bills')->name('bills');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
