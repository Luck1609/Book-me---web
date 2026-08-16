<?php

namespace App\Models;

use App\Enums\ProviderStatus;
use Database\Factories\ProviderProfileFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProviderProfile extends Model
{
    /** @use HasFactory<ProviderProfileFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id', 'business_name', 'slug', 'description', 'phone', 'email', 'address', 'city',
        'latitude', 'longitude', 'logo_path', 'cover_path', 'status', 'is_accepting_bookings',
        'average_rating', 'review_count',
    ];

    protected $attributes = [
        'status' => ProviderStatus::Draft->value,
        'is_accepting_bookings' => true,
        'average_rating' => 0,
        'review_count' => 0,
    ];

    protected function casts(): array
    {
        return [
            'status' => ProviderStatus::class,
            'is_accepting_bookings' => 'boolean',
            'average_rating' => 'decimal:2',
            'review_count' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return HasMany<Service, $this>
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * @return HasMany<StaffMember, $this>
     */
    public function staffMembers(): HasMany
    {
        return $this->hasMany(StaffMember::class);
    }

    /**
     * @return HasMany<BusinessHour, $this>
     */
    public function businessHours(): HasMany
    {
        return $this->hasMany(BusinessHour::class);
    }

    /**
     * @return HasMany<AvailabilityBlock, $this>
     */
    public function availabilityBlocks(): HasMany
    {
        return $this->hasMany(AvailabilityBlock::class);
    }

    /**
     * @param  Builder<ProviderProfile>  $query
     * @return Builder<ProviderProfile>
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', ProviderStatus::Approved->value);
    }
}
