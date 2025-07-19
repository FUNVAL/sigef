<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
/* 
- id (PK, bigint)
- id_curso (FK, bigint)
- id_controller (FK, bigint)    
- Nivel (string)
- nombre (string)
- status (bool)  
*/

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->foreignId('controller_id')->constrained('users')->onDelete('cascade');
            $table->string('level')->nullable();
            $table->string('name')->nullable();
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::create('group_teacher', function (Blueprint $table) {
            $table->unsignedBigInteger('group_id');
            $table->unsignedBigInteger('teacher_id');
            $table->primary(['group_id', 'teacher_id']);
            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
            $table->foreign('teacher_id')->references('id')->on('users')->onDelete('cascade');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups_teacher');
        Schema::dropIfExists('groups');
    }
};
