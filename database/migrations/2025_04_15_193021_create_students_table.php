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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('enrollment_code')->unique();
            $table->boolean('active_church_member')->default(false);
            $table->string('church_member_id')->nullable();
            $table->enum('device_type', ['tablet', 'phone', 'computer'])->nullable();
            $table->enum('english_connect_level', [0, 1, 2, 3])->nullable();
            $table->boolean('home_internet')->default(false);
            $table->string('mission_served')->nullable();
            $table->integer('mission_end_year')->nullable();
            $table->boolean('temple_sealed')->default(false);
            $table->integer('number_of_children')->default(0);
            $table->integer('number_of_family_members')->default(0);
            $table->float('family_donation')->default(0);
            $table->float('family_bonus_amount')->default(0);
            $table->string('calling')->nullable();
            $table->string('formal_photo')->nullable();
            $table->string('utility_bill')->nullable();
            $table->enum('status', ['in_course', 'graduated', 'dropped_out'])->default('in_course');
            $table->boolean('health_affidavit')->default(false);
            $table->boolean('understanding_agreement')->default(false);
            $table->boolean('work_commitment')->default(false);
            $table->boolean('data_authorization')->default(false);
            $table->boolean('scholarship_agreement')->default(false);
            $table->foreignId('country_id'); #->constrained()->onDelete('cascade');
            $table->foreignId('group_id')->constrained()->onDelete('cascade');
            $table->foreignId('course_id')->constrained()->onDelete('cascade');
            $table->foreignId('recruiter_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
