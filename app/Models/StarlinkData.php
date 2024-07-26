<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StarlinkData extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_starlink',
        'email',
        'nomor_seri',
        'nomor_kits',
        'tanggal_jatuh_tempo',
        'status_pembayaran',
        'periode_penagihan',
        'invoice_path',
    ];
}