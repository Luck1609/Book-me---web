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
    Schema::create('services', function (Blueprint $table): void {
      $table->uuid('id')->primary();
      $table->foreignUuid('provider_profile_id')->constrained()->cascadeOnDelete();
      $table->string('name');
      $table->text('description')->nullable();
      $table->decimal('price', 10, 2);
      $table->unsignedInteger('min_duration_minutes');
      $table->unsignedInteger('max_duration_minutes');
      $table->boolean('is_active')->default(true)->index();
      $table->boolean('requires_payment')->default(false);
      $table->unsignedInteger('sort_order')->default(0);
      $table->timestamps();
      $table->softDeletes();
      $table->index(['provider_profile_id', 'is_active']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('services');
  }
};
