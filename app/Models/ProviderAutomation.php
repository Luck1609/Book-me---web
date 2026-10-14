<?php

namespace App\Models;

use Database\Factories\ProviderAutomationFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProviderAutomation extends Model
{
    /** @use HasFactory<ProviderAutomationFactory> */
    use HasFactory, HasUuids;

    protected $fillable = ['provider_profile_id', 'key', 'enabled', 'message', 'channel', 'channels'];

    protected function casts(): array
    {
        return ['enabled' => 'boolean', 'channels' => 'array'];
    }

    /** @return BelongsTo<ProviderProfile, $this> */
    public function providerProfile(): BelongsTo
    {
        return $this->belongsTo(ProviderProfile::class);
    }
}
