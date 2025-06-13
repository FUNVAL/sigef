<?php

use App\Enums\GenderEnum;
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
        Schema::create('references', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('gender')->default(GenderEnum::MALE->value);
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->foreignId('stake_id')->constrained()->onDelete('cascade');
            $table->boolean('status')->default(false);
            $table->integer('reason')->nullable();
            $table->string('referrer_name')->nullable();
            $table->string('referrer_phone')->nullable();
            $table->string('relationship_with_referred')->nullable();
            $table->foreignId('modifier_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('references');
    }
};
