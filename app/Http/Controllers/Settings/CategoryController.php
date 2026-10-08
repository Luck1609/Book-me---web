<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\CategoryRequest;
use App\Models\ProviderCategory;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function store(CategoryRequest $request): RedirectResponse
    {
        abort_unless($request->user() instanceof User, 401);

        $profile = $request->user()->providerProfile()->firstOrFail();

        $profile->categories()->create($request->validated());

        return to_route('settings.catalog.index', ['target' => 'categories']);
    }

    public function update(CategoryRequest $request, ProviderCategory $category): RedirectResponse
    {
        $category->update($request->validated());

        return to_route('settings.catalog.index', ['target' => 'categories']);
    }

    public function destroy(CategoryRequest $request, ProviderCategory $category): RedirectResponse
    {
        $category->delete();

        return to_route('settings.catalog.index', ['target' => 'categories']);
    }
}
