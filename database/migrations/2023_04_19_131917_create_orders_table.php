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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userid')->constrained('users');
            $table->enum('status', ['unpaid', 'paid', 'cooking', 'ready', 'enroute', 'delivered'])->default('unpaid');
            $table->timestamps();
        });

        Schema::create('ordersfoods', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignId('orderid')->constrained('orders');
            $table->foreignId('foodid')->constrained('foods');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordersfoods');
        Schema::dropIfExists('orders');
    }
};
