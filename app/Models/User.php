<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Laravel\Fortify\Contracts\PasskeyUser;
use Laravel\Fortify\PasskeyAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Permission\Traits\HasRoles;

/**
 * @property string $id
 * @property string $name
 * @property string|null $email
 * @property Carbon|null $email_verified_at
 * @property string|null $phone
 * @property Carbon|null $phone_verified_at
 * @property string|null $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property Carbon|null $two_factor_confirmed_at
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['name', 'email', 'phone', 'password', 'is_active', 'has_onboarded'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable implements HasMedia, PasskeyUser
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, HasRoles, HasUuids, InteractsWithMedia, Notifiable, PasskeyAuthenticatable, TwoFactorAuthenticatable;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $attributes = [
        'is_active' => true,
    ];

    protected $appends = [
        'avatar',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'has_onboarded' => 'boolean',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile();
    }

    public function getAvatarAttribute(): ?string
    {
        return $this->getFirstMediaUrl('avatar') ?: $this->social_avatar;
    }

    /**
     * @return HasOne<ProviderProfile, $this>
     */
    public function providerProfile(): HasOne
    {
        return $this->hasOne(ProviderProfile::class);
    }

    /**
     * @return HasMany<Booking, $this>
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * @return BelongsToMany<ProviderProfile, $this>
     */
    public function clientProviders(): BelongsToMany
    {
        return $this->belongsToMany(ProviderProfile::class);
    }

    /**
     * @return BelongsToMany<ProviderProfile, $this>
     */
    public function favoriteProviders(): BelongsToMany
    {
        return $this->belongsToMany(ProviderProfile::class, 'provider_favorites', 'client_id', 'provider_profile_id')
            ->withTimestamps();
    }

    /**
     * @return HasMany<Conversation, $this>
     */
    public function clientConversations(): HasMany
    {
        return $this->hasMany(Conversation::class, 'client_id');
    }

    /**
     * @return HasMany<Message, $this>
     */
    public function sentMessages(): HasMany
    {
        return $this->hasMany(Message::class, 'sender_id');
    }
}
