<?php

namespace App\Http\Resources;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Service
 */
class ServiceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'provider_profile_id' => $this->provider_profile_id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'duration_minutes' => $this->min_duration_minutes === $this->max_duration_minutes
                ? $this->min_duration_minutes
                : null,
            'min_duration_minutes' => $this->min_duration_minutes,
            'max_duration_minutes' => $this->max_duration_minutes,
            'is_active' => $this->is_active,
            'requires_payment' => $this->requires_payment,
            'sort_order' => $this->sort_order,
        ];
    }
}
