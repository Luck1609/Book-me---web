<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class OtpChallenge extends Model
{
    use HasUuids;

    protected $fillable = ['phone', 'code_hash', 'expires_at', 'verified_at', 'attempts'];

    protected $hidden = ['code_hash'];

    protected $attributes = ['attempts' => 0];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'verified_at' => 'datetime',
            'attempts' => 'integer',
        ];
    }
}
