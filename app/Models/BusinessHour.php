<?php

namespace App\Models;

use Database\Factories\BusinessHourFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessHour extends Model
{
    /** @use HasFactory<BusinessHourFactory> */
    use HasFactory, HasUuids;

    protected $fillable = ['provider_profile_id', 'day_of_week', 'is_closed', 'opens_at', 'closes_at'];

    protected $attributes = ['is_closed' => false];

    protected function casts(): array
    {
        return ['day_of_week' => 'integer', 'is_closed' => 'boolean'];
    }

    /**
     * @return BelongsTo<ProviderProfile, $this>
     */
    public function providerProfile(): BelongsTo
    {
        return $this->belongsTo(ProviderProfile::class);
    }
}
