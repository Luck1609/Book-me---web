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
    Schema::create('provider_profiles', function (Blueprint $table): void {
      $table->uuid('id')->primary();
      $table->foreignUuid('user_id')->unique()->constrained()->cascadeOnDelete();
      $table->string('business_name');
      $table->string('slug')->unique();
      $table->text('description')->nullable();
      $table->string('phone', 20)->nullable();
      $table->string('email')->nullable();
      $table->string('address')->nullable();
      $table->string('city')->nullable()->index();
      $table->decimal('latitude', 10, 7)->nullable();
      $table->decimal('longitude', 10, 7)->nullable();
      $table->string('logo_path')->nullable();
      $table->string('cover_path')->nullable();
      $table->string('status')->default('draft')->index();
      $table->boolean('is_accepting_bookings')->default(true)->index();
      $table->decimal('average_rating', 3, 2)->default(0);
      $table->unsignedInteger('review_count')->default(0);
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('provider_profiles');
  }
};
