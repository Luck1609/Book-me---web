<?php

namespace App\Models;

use Database\Factories\StaffMemberFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StaffMember extends Model
{
    /** @use HasFactory<StaffMemberFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'provider_profile_id',
        'name',
        'email',
        'phone',
        'role',
        'status',
        'shift_start',
        'shift_end',
        'next_shift_at',
        'photo_path',
        'rating',
        'is_active',
    ];

    protected $attributes = [
        'status' => 'offline',
        'is_active' => true,
    ];

    protected function casts(): array
    {
        return [
            'next_shift_at' => 'datetime',
            'rating' => 'decimal:1',
            'is_active' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<ProviderProfile, $this>
     */
    public function providerProfile(): BelongsTo
    {
        return $this->belongsTo(ProviderProfile::class);
    }

    /**
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
