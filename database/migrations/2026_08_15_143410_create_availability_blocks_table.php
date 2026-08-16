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
    Schema::create('availability_blocks', function (Blueprint $table): void {
      $table->uuid('id')->primary();
      $table->foreignUuid('provider_profile_id')->constrained()->cascadeOnDelete();
      $table->foreignUuid('user_id')->nullable()->constrained()->nullOnDelete();
      $table->dateTime('starts_at');
      $table->dateTime('ends_at');
      $table->string('type')->index();
      $table->string('reason')->nullable();
      $table->timestamps();
      $table->index(['provider_profile_id', 'starts_at', 'ends_at']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('availability_blocks');
  }
};
