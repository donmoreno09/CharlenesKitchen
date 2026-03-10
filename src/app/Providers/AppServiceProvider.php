<?php

namespace App\Providers;

use App\Contracts\Repositories\MenuItemRepositoryInterface;
use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Repositories\MenuItemRepository;
use App\Repositories\OrderRepository;
use App\Services\CloudinaryService;
use App\Services\EmailService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Order;
use App\Policies\OrderPolicy;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind interfaces to concrete implementations.
        // When Laravel sees MenuItemRepositoryInterface as a type hint anywhere,
        // it injects MenuItemRepository — the concrete class that does the work.
        $this->app->bind(MenuItemRepositoryInterface::class, MenuItemRepository::class);
        $this->app->bind(OrderRepositoryInterface::class, OrderRepository::class);

        // Singleton services — one shared instance per request
        $this->app->singleton(CloudinaryService::class, fn() => new CloudinaryService());
        $this->app->singleton(EmailService::class, fn() => new EmailService());
    }

    public function boot(): void
    {
        // Define a gate for menu management.
        // 'manage-menu' can be checked anywhere: Gate::allows('manage-menu')
        // or via the 'can' middleware on routes.
        // Define gates for menu management
        Gate::define('manage-menu', fn(User $user): bool => $user->is_admin);
        
        // Explicitly register which Policy governs which Model.
        Gate::policy(Order::class, OrderPolicy::class);
    }
}