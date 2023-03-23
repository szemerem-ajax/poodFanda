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
        Schema::create('foodcategories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurantid')->constrained('users');
            $table->string('name');
            $table->string('description')->default('No description provided.');
            $table->integer('price');
            $table->timestamps();
        });

        Schema::create('foodscategories', function (Blueprint $table) {
            $table->foreignId('foodid')->constrained('foods');
            $table->foreignId('categoryid')->constrained('foodcategories');
            $table->primary(['foodid', 'categoryid']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('foodcategories');
        Schema::dropIfExists('foods');
        Schema::dropIfExists('foodscategories');
    }
};
