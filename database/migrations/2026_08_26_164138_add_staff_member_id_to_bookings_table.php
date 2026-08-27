<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->foreignUuid('staff_member_id')
                ->nullable()
                ->after('provider_profile_id')
                ->constrained()
                ->nullOnDelete();
            $table->index(['staff_member_id', 'schedule']);
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->dropForeign(['staff_member_id']);
            $table->dropIndex(['staff_member_id', 'schedule']);
            $table->dropColumn('staff_member_id');
        });
    }
};
