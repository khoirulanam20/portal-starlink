<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StarlinkDataController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web', 'auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
        Route::get('/input-alat', function () {
            return Inertia::render('Dashboard/InputAlat');
        })->name('input.alat');
        Route::get('/update-alat', function () {
            return Inertia::render('Dashboard/UpdateAlat');
        })->name('update.alat');
    });

    Route::put('/starlink-data/{id}', [StarlinkDataController::class, 'update'])->name('starlink-data.update');
    Route::get('/starlink-data', [StarlinkDataController::class, 'index'])->name('starlink-data.index');
    Route::post('/starlink-data', [StarlinkDataController::class, 'store'])->name('starlink-data.store');
    Route::delete('/starlink-data/{id}', [StarlinkDataController::class, 'destroy'])->name('starlink-data.destroy');
});

require __DIR__.'/auth.php';