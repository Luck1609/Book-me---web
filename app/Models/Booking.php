<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
  use HasUuids;

  public $incrementing = false;

  protected $keyType = 'string';

  protected $fillable = [
    'user_id',
    'provider_profile_id',
    'service_id',
    'schedule',
    'note'
  ];

  protected $casts = [
    'schedule' => 'datetime'
  ];
}
