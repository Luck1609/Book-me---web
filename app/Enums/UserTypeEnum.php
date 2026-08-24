<?php

namespace App\Enums;

enum UserTypeEnum: string
{
    case CLIENT = 'client';
    case PROVIDER = 'provider';

    public function label(): string
    {
        return match ($this) {
            self::CLIENT => 'Client',
            self::PROVIDER => 'Provider',
        };
    }
}
