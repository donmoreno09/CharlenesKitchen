<?php

namespace App\Providers;

use App\Contracts\Repositories\MenuItemRepositoryInterface;
use App\Contracts\Repositories\OrderRepositoryInterface;
use App\Repositories\MenuItemRepository;
use App\Repositories\OrderRepository;
use App\Services\CloudinaryService;
use App\Services\EmailService;
use Illuminate\Support\ServiceProvider;

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
        //
    }
}