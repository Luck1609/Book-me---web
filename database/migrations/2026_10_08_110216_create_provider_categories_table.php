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
        Schema::create('provider_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignUuid('provider_profile_id')->constrained()->cascadeOnDelete();
            $table->string('slug')->nullable();
            $table->timestamps();
        });

        Schema::table('services', function (Blueprint $table): void {
            $table->foreignUuid('category_id')
                ->nullable()
                ->after('provider_profile_id')
                ->constrained('provider_categories')
                ->nullOnDelete();
            $table->index(['category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table): void {
            $table->dropIndex(['category_id']);
            $table->dropConstrainedForeignId('category_id');
        });

        Schema::dropIfExists('provider_categories');
    }
};
