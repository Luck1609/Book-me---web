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
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class ProviderProfile extends Model implements HasMedia
{
    /** @use HasFactory<ProviderProfileFactory> */
    use HasFactory, HasSlug, HasUuids, InteractsWithMedia;

    protected $fillable = [
        'user_id',
        'region_id',
        'district_id',
        'category_id',
        'business_name',
        'slug',
        'description',
        'phone',
        'email',
        'address',
        'city',
        'latitude',
        'longitude',
        'status',
        'working_days',
        'works_on_holidays',
        'is_accepting_bookings',
        // 'average_rating', 'review_count',
    ];

    protected $attributes = [
        'status' => ProviderStatus::Draft->value,
        'is_accepting_bookings' => true,
    ];

    protected function casts(): array
    {
        return [
            'status' => ProviderStatus::class,
            'working_days' => 'array',
            'works_on_holidays' => 'boolean',
            'is_accepting_bookings' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('business_name')
            ->saveSlugsTo('slug');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile();
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
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
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
