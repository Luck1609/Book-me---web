<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasSlug, HasUuids;

    protected $fillable = ['provider_profile_id', 'name', 'slug', 'description', 'parent_id'];

    /** @return BelongsTo<ProviderProfile, $this> */
    public function providerProfile(): BelongsTo
    {
        return $this->belongsTo(ProviderProfile::class);
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function childCategories(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parentCategories(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }
}
