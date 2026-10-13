<?php

namespace App\Enums;

enum UserTypeEnum: string
{
  case Client = 'client';
  case Provider = 'provider';

  public function label(): string
  {
    return match ($this) {
      self::Client => 'Client',
      self::Provider => 'Provider',
    };
  }
}
