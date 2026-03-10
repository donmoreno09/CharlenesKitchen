<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    // GET /api/categories
    // Returns all active categories, optionally with their menu items.
    // This is a public endpoint — no authentication required.
    public function index(): AnonymousResourceCollection
    {
        $categories = Category::active()
            ->ordered()
            // withCount() adds a menu_items_count field without loading all items.
            // Useful for the frontend to display "12 items" without the overhead
            // of fetching every menu item for every category.
            ->withCount(['menuItems' => fn($q) => $q->available()])
            ->get();

        return CategoryResource::collection($categories);
    }

    // GET /api/categories/{category}
    // Returns a single category with all its available menu items.
    public function show(Category $category): CategoryResource
    {
        // Route Model Binding — Laravel automatically resolves {category}
        // in the URL to a Category model instance. If the ID doesn't exist,
        // a 404 is returned before this method even runs.
        $category->load(['menuItems' => fn($q) => $q->available()->orderBy('name')]);

        return new CategoryResource($category);
    }
}