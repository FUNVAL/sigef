<?php

use App\Enums\GenderEnum;
use App\Enums\MaritalStatusEnum;
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
        Schema::create('pre_inscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 50);
            $table->string('middle_name', 50)->nullable();
            $table->string('last_name', 50);
            $table->string('second_last_name', 50)->nullable();
            $table->integer('gender')->default(GenderEnum::MALE->value);
            $table->integer('age');
            $table->string('phone', 20);
            $table->string('email', 100)->unique();
            $table->integer('marital_status')->default(MaritalStatusEnum::SINGLE->value);
            $table->boolean('served_mission');
            $table->boolean('currently_working')->nullable();
            $table->integer('job_type_preference')->nullable();
            $table->boolean('available_full_time')->nullable();
            $table->integer('status')->default(RequestStatusEnum::PENDING->value);
            $table->text('comments')->nullable();
            $table->integer('declined_reason')->nullable();
            $table->integer('modified_by')->nullable();
            $table->foreignId('country_id')->constrained()->onDelete('cascade');
            $table->foreignId('stake_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /** 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_inscriptions');
    }
};
