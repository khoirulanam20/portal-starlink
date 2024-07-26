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
        Schema::create('starlink_data', function (Blueprint $table) {
            $table->id();
            $table->string('id_starlink');
            $table->string('email');
            $table->string('nomor_seri');
            $table->string('nomor_kits');
            $table->date('tanggal_jatuh_tempo');
            $table->string('status_pembayaran');
            $table->date('periode_penagihan');
            $table->string('invoice_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('starlink_data');
    }
};