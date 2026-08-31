<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('provider_favorites', function (Blueprint $table): void {
            $table->foreignUuid('client_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('provider_profile_id')->constrained()->cascadeOnDelete();
            $table->primary(['client_id', 'provider_profile_id']);
            $table->index('provider_profile_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_favorites');
    }
};
