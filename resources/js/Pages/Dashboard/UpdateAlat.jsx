import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function UpdateAlat({ auth }) {
    const [csrfToken, setCsrfToken] = useState('');
    const [starlinkData, setStarlinkData] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [formData, setFormData] = useState({
        id_starlink: '',
        email: '',
        nomor_seri: '',
        nomor_kits: '',
        tanggal_jatuh_tempo: '',
        status_pembayaran: '',
        periode_penagihan: '',
        invoice: null,
    });

    useEffect(() => {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        setCsrfToken(token);

        axios.get(route('starlink-data.index'))
            .then(response => {
                setStarlinkData(response.data);
            })
            .catch(error => {
                console.error("Ada kesalahan saat mengambil data!", error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, invoice: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedId) {
            console.error('Tidak ada ID yang dipilih');
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            const response = await axios.post(route('starlink-data.update', selectedId), formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT'
                }
            });
            console.log('Data berhasil diperbarui', response.data);
            // Reset form atau lakukan tindakan lain setelah berhasil
        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error('Kesalahan validasi:', error.response.data.errors);
            } else {
                console.error('Ada kesalahan saat memperbarui data!', error);
            }
        }
    };

    const handleEdit = (item) => {
        setSelectedId(item.id);
        setFormData({
            id_starlink: item.id_starlink,
            email: item.email,
            nomor_seri: item.nomor_seri,
            nomor_kits: item.nomor_kits,
            tanggal_jatuh_tempo: item.tanggal_jatuh_tempo,
            status_pembayaran: item.status_pembayaran,
            periode_penagihan: item.periode_penagihan,
            invoice: null, // Reset file input
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await axios.delete(route('starlink-data.destroy', id), {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    }
                });
                console.log('Data berhasil dihapus');
                // Refresh data setelah penghapusan
                const response = await axios.get(route('starlink-data.index'));
                setStarlinkData(response.data);
                setSelectedId('');
                setFormData({
                    id_starlink: '',
                    email: '',
                    nomor_seri: '',
                    nomor_kits: '',
                    tanggal_jatuh_tempo: '',
                    status_pembayaran: '',
                    periode_penagihan: '',
                    invoice: null,
                });
            } catch (error) {
                console.error('Ada kesalahan saat menghapus data!', error);
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Update Alat</h2>}
        >
            <Head title="Update Alat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">Pilih Data untuk Diupdate</h3>
                        <select 
                            className="w-full p-2 mb-4 border rounded"
                            onChange={(e) => handleEdit(starlinkData.find(item => item.id === parseInt(e.target.value)))}
                            value={selectedId}
                        >
                            <option value="">Pilih Data</option>
                            {starlinkData.map(item => (
                                <option key={item.id} value={item.id}>{item.id_starlink} - {item.email}</option>
                            ))}
                        </select>

                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-xl mx-auto">
                            <input type="hidden" name="_token" value={csrfToken} />
                            <div className="mb-4">
                                <label htmlFor="id_starlink" className="block text-sm font-medium text-gray-700">ID Starlink</label>
                                <input
                                    type="text"
                                    id="id_starlink"
                                    name="id_starlink"
                                    value={formData.id_starlink}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nomor_seri" className="block text-sm font-medium text-gray-700">Nomor Seri</label>
                                <input
                                    type="text"
                                    id="nomor_seri"
                                    name="nomor_seri"
                                    value={formData.nomor_seri}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nomor_kits" className="block text-sm font-medium text-gray-700">Nomor Kits</label>
                                <input
                                    type="text"
                                    id="nomor_kits"
                                    name="nomor_kits"
                                    value={formData.nomor_kits}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="tanggal_jatuh_tempo" className="block text-sm font-medium text-gray-700">Tanggal Jatuh Tempo</label>
                                <input
                                    type="date"
                                    id="tanggal_jatuh_tempo"
                                    name="tanggal_jatuh_tempo"
                                    value={formData.tanggal_jatuh_tempo}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="status_pembayaran" className="block text-sm font-medium text-gray-700">Status Pembayaran</label>
                                <select
                                    id="status_pembayaran"
                                    name="status_pembayaran"
                                    value={formData.status_pembayaran}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                >
                                    <option value="paid">Paid</option>
                                    <option value="unpaid">Unpaid</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="periode_penagihan" className="block text-sm font-medium text-gray-700">Periode Penagihan</label>
                                <input
                                    type="date"
                                    id="periode_penagihan"
                                    name="periode_penagihan"
                                    value={formData.periode_penagihan}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="invoice" className="block text-sm font-medium text-gray-700">Invoice (PDF)</label>
                                <input
                                    type="file"
                                    id="invoice"
                                    name="invoice"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full"
                                    accept=".pdf"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    disabled={!selectedId}
                                >
                                    Update Data
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(selectedId)}
                                    disabled={!selectedId}
                                >
                                    Hapus Data
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}