<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\VMController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\BackupController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\CheckSubscription;
use App\Models\RatePlan;

Route::get('/', function () {
    $rate = RatePlan::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'rate' => $rate,
    ]);
});

/*Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

Route::middleware('auth')->group(function () {

    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(CheckSubscription::class)->group(function (){
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('/virtual-machines/create', [VMController::class, 'create'])->name('vm.create');
        Route::post('/virtual-machines/store', [VMController::class, 'store'])->name('vm.store');
        Route::get('/virtual-machines/{vm}', [VMController::class, 'show'])->name('vm.show');
        Route::delete('/virtual-machines/{vm}/delete', [VMController::class, 'delete'])->name('vm.delete');
        Route::patch('/virtual-machines/{vm}/status', [VMController::class, 'status_update'])->name('vm.status');
        Route::patch('/virtual-machines/{vm}/update', [VMController::class, 'update'])->name('vm.update');
        Route::post('/virtual-machines/{vm}/backup', [VMController::class, 'backup_creation'])->name('vm.backup');

        Route::get('/backup', [BackupController::class, 'index'])->name('backup.index');
        Route::get('/backup/{backup}/delete', [BackupController::class, 'delete'])->name('backup.delete');
    });

    //Subscription

    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('/subscription/users', [SubscriptionController::class, 'users'])->name('subscription.users');
    Route::post('/subscribe', [SubscriptionController::class, 'subscribe'])->name('subscription.subscribe');
    Route::post('/subscribe/{subscriptionId}/add-child-account', [SubscriptionController::class, 'add_child_account'])->name('subscription.add_child_account');
    Route::post('/subscribe/{subscriptionId}/remove-child-account', [SubscriptionController::class, 'remove_child_account'])->name('subscription.remove_child_account');

    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::post('/billing/pay', [BillingController::class, 'pay'])->name('billing.pay');

    //Backups

   

});

require __DIR__.'/auth.php';

Route::get('auth/google', [GoogleController::class, 'loginWithGoogle'])->name('google-login');
Route::get('auth/google/callback', [GoogleController::class, 'callbackFromGoogle'])->name('callback');
