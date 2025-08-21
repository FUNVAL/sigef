<?php

use App\Enums\GenderEnum;
use App\Enums\ReferenceStatusEnum;
use App\Enums\RelatedReferenceEnum;
use App\Enums\RequestStatusEnum;
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
            $table->integer('age')->nullable();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->string('phone')->nullable();
            $table->foreignId('stake_id')->constrained()->onDelete('cascade');
            $table->integer('status')->default(RequestStatusEnum::PENDING->value);
            $table->integer('declined_reason')->default(ReferenceStatusEnum::NO_CONTACT->value)->nullable();
            $table->string('declined_description')->nullable();
            $table->string('referrer_name')->nullable();
            $table->string('referrer_phone')->nullable();
            $table->integer('relationship_with_referred')->default(RelatedReferenceEnum::FRIEND->value);
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
