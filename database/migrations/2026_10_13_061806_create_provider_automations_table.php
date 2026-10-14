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
        Schema::create('provider_automations', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('provider_profile_id')->constrained()->cascadeOnDelete();
            $table->string('key');
            $table->boolean('enabled')->default(false);
            $table->text('message')->nullable();
            $table->json('channels')->default(['email']);
            $table->timestamps();

            $table->unique(['provider_profile_id', 'key']);
            $table->index(['provider_profile_id', 'enabled']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_automations');
    }
};
