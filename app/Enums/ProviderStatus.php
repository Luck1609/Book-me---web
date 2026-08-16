<?php

namespace App\Enums;

enum ProviderStatus: string
{
    case Draft = 'draft';
    case PendingReview = 'pending_review';
    case Approved = 'approved';
    case Suspended = 'suspended';
}
