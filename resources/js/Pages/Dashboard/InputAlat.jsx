import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function InputAlat({ auth }) {
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setCsrfToken(token);
    }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Input Alat
                </h2>
            }
        >
            <Head title="Input Alat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form className="max-w-xl mx-auto" action="/starlink-data" method="POST" encType="multipart/form-data">
                            <input type="hidden" name="_token" value={csrfToken} />
                            <div className="mb-4">
                                <label htmlFor="id_starlink" className="block text-sm font-medium text-gray-700">ID Starlink</label>
                                <input type="text" id="id_starlink" name="id_starlink" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nomor_seri" className="block text-sm font-medium text-gray-700">Nomor Seri</label>
                                <input type="text" id="nomor_seri" name="nomor_seri" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nomor_kits" className="block text-sm font-medium text-gray-700">Nomor Kits</label>
                                <input type="text" id="nomor_kits" name="nomor_kits" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tanggal_jatuh_tempo" className="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
                                <input type="date" id="tanggal_jatuh_tempo" name="tanggal_jatuh_tempo" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status_pembayaran" className="block text-sm font-medium text-gray-700">Status Pembayaran</label>
                                <select id="status_pembayaran" name="status_pembayaran" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="periode_penagihan" className="block text-sm font-medium text-gray-700">Periode Penagihan</label>
                                <input type="date" id="periode_penagihan" name="periode_penagihan" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="invoice" className="block text-sm font-medium text-gray-700">Invoice (PDF)</label>
                                <input type="file" id="invoice" name="invoice" accept="application/pdf" className="mt-1 block w-full" required />
                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}