<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\StarlinkData;
use Illuminate\Support\Facades\Storage;

class StarlinkDataController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'id_starlink' => 'required|string',
            'email' => 'required|email',
            'nomor_seri' => 'required|string',
            'nomor_kits' => 'required|string',
            'tanggal_jatuh_tempo' => 'required|date',
            'status_pembayaran' => 'required|string',
            'periode_penagihan' => 'required|date',
            'invoice' => 'required|file|mimes:pdf',
        ]);

        $invoicePath = $request->file('invoice')->store('', 'invoices');

        StarlinkData::create([
            'id_starlink' => $request->id_starlink,
            'email' => $request->email,
            'nomor_seri' => $request->nomor_seri,
            'nomor_kits' => $request->nomor_kits,
            'tanggal_jatuh_tempo' => $request->tanggal_jatuh_tempo,
            'status_pembayaran' => $request->status_pembayaran,
            'periode_penagihan' => $request->periode_penagihan,
            'invoice_path' => $invoicePath,
        ]);

        return redirect()->back()->with('success', 'Data berhasil disimpan.');
    }

    public function index()
    {
        $data = StarlinkData::all();
        return response()->json($data);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'id_starlink' => 'required|string',
            'email' => 'required|email',
            'nomor_seri' => 'required|string',
            'nomor_kits' => 'required|string',
            'tanggal_jatuh_tempo' => 'required|date',
            'status_pembayaran' => 'required|string',
            'periode_penagihan' => 'required|date',
            'invoice' => 'nullable|file|mimes:pdf',
        ]);

        $starlinkData = StarlinkData::findOrFail($id);

        if ($request->hasFile('invoice')) {
            $invoicePath = $request->file('invoice')->store('', 'invoices');
            $starlinkData->invoice_path = $invoicePath;
        }

        $starlinkData->update($request->only([
            'id_starlink',
            'email',
            'nomor_seri',
            'nomor_kits',
            'tanggal_jatuh_tempo',
            'status_pembayaran',
            'periode_penagihan',
        ]));

        return response()->json($starlinkData);
    }

    public function destroy($id)
    {
        $starlinkData = StarlinkData::findOrFail($id);
        $starlinkData->delete();
        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}