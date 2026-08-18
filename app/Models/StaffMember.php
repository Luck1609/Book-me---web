<?php

namespace App\Models;

use Database\Factories\StaffMemberFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StaffMember extends Model
{
  /** @use HasFactory<StaffMemberFactory> */
  use HasFactory, HasUuids;

  protected $fillable = ['provider_profile_id', 'name', 'phone', 'photo_path', 'is_active'];

  protected $attributes = ['is_active' => true];

  protected function casts(): array
  {
    return ['is_active' => 'boolean'];
  }

  /**
   * @return BelongsTo<ProviderProfile, $this>
   */
  public function providerProfile(): BelongsTo
  {
    return $this->belongsTo(ProviderProfile::class);
  }
}
