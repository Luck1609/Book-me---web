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
        Schema::table('bookings', function (Blueprint $table): void {
            $table->unsignedInteger('duration_minutes')->nullable()->after('schedule');
            $table->string('status')->default('pending')->index()->after('note');
            $table->index(['provider_profile_id', 'status', 'schedule']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->dropIndex(['provider_profile_id', 'status', 'schedule']);
            $table->dropIndex(['status']);
            $table->dropColumn(['duration_minutes', 'status']);
        });
    }
};
