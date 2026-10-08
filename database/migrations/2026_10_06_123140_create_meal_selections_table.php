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
        Schema::create('meal_selections', function (Blueprint $table) {
            $table->id();

            $table->foreignId('subscription_id')->constrained()->cascadeOnDelete();
            $table->foreignId('meal_id')->constrained()->restrictOnDelete();
            $table->date('selection_date');
            $table->enum('delivery_type', ['pickup', 'delivery'])->default('delivery');
            $table->text('notes')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'delivered', 'skipped'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('meal_selections');
    }
};
