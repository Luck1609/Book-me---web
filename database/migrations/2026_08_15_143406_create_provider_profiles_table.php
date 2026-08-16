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
      $table->foreignUuid('region_id')->constrained()->cascadeOnDelete();
      $table->foreignUuid('district_id')->constrained()->cascadeOnDelete();
      $table->foreignUuid('category_id')->constrained()->cascadeOnDelete();
      $table->string('business_name');
      $table->text('description')->nullable();
      $table->string('phone', 20)->nullable();
      $table->string('email')->nullable();
      $table->string('address')->nullable();
      $table->string('city')->nullable()->index();
      $table->decimal('latitude', 10, 7)->nullable();
      $table->decimal('longitude', 10, 7)->nullable();
      $table->string('status')->default('draft')->index();
      $table->json('working_days');
      $table->boolean('works_on_holidays')->default(false);
      $table->boolean('is_accepting_bookings')->default(true)->index();
      // $table->decimal('average_rating', 3, 2)->default(0);
      // $table->unsignedInteger('review_count')->default(0);
      $table->string('slug')->unique();
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
