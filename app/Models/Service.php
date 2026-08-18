<?php

namespace App\Models;

use Database\Factories\ServiceFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
  /** @use HasFactory<ServiceFactory> */
  use HasFactory, HasUuids, SoftDeletes;

  protected $fillable = [
    'provider_profile_id',
    'name',
    'description',
    'price',
    'duration_minutes',
    'is_active',
    'requires_payment',
    'sort_order',
  ];

  protected $attributes = [
    'is_active' => true,
    'requires_payment' => false,
    'sort_order' => 0,
  ];

  protected function casts(): array
  {
    return [
      'price' => 'decimal:2',
      'duration_minutes' => 'integer',
      'is_active' => 'boolean',
      'requires_payment' => 'boolean',
      'sort_order' => 'integer',
    ];
  }

  /**
   * @return BelongsTo<ProviderProfile, $this>
   */
  public function providerProfile(): BelongsTo
  {
    return $this->belongsTo(ProviderProfile::class);
  }
}
