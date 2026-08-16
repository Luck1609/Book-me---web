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
    Schema::create('otp_challenges', function (Blueprint $table): void {
      $table->uuid('id')->primary();
      $table->string('phone', 20)->index();
      $table->string('code_hash');
      $table->timestamp('expires_at')->index();
      $table->timestamp('verified_at')->nullable();
      $table->unsignedTinyInteger('attempts')->default(0);
      $table->timestamps();
      $table->index(['phone', 'verified_at', 'expires_at']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('otp_challenges');
  }
};
