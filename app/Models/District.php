<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class District extends Model
{
  use HasUuids, HasSlug;

  public $incrementing = false;

  protected $keyType = 'string';

  protected $fillable = ['name', 'slug'];

  public function getSlugOptions(): SlugOptions
  {
    return SlugOptions::create()
      ->generateSlugsFrom('name')
      ->saveSlugsTo('slug');
  }

  public function districts(): BelongsTo
  {
    return $this->belongsTo(Region::class);
  }
}
