<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff_members', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('provider_profile_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 20)->nullable();
            $table->string('role');
            $table->string('status')->default('offline');
            $table->time('shift_start')->nullable();
            $table->time('shift_end')->nullable();
            $table->dateTime('next_shift_at')->nullable();
            $table->string('photo_path')->nullable();
            $table->decimal('rating', 2, 1)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['provider_profile_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_members');
    }
};
