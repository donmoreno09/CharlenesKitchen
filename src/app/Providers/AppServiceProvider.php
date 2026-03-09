<?php

namespace App\Providers;

use App\Services\CloudinaryService;
use App\Services\EmailService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Binding tells the container: "when anything asks for CloudinaryService,
        // create and return a singleton instance of it."
        //
        // A singleton means the same instance is reused for the entire request —
        // we don't create a new CloudinaryService object for every controller.
        $this->app->singleton(CloudinaryService::class, function () {
            return new CloudinaryService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}