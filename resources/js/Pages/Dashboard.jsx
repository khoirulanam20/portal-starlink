import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs"; // Pastikan dayjs diimpor dengan benar

export default function Dashboard({ auth }) {
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [status, setStatus] = useState('');
    const [invoice, setInvoice] = useState('');

    useEffect(() => {
        axios.get(route('starlink-data.index'))
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handlePayClick = (item) => {
        setSelectedItem(item);
        setStatus(item.status_pembayaran);
        setInvoice(item.invoice_path);
        setShowPopup(true);
    };

    const handleUpdate = () => {
        // Lakukan update status dan invoice di sini
        axios.put(route('starlink-data.update', selectedItem.id), {
            status_pembayaran: status,
            invoice_path: invoice
        })
        .then(response => {
            // Update data di state
            setData(data.map(d => d.id === selectedItem.id ? response.data : d));
            setShowPopup(false);
        })
        .catch(error => {
            console.error("There was an error updating the data!", error);
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            ID Starlink
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nomor Seri
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nomor Kits
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Tanggal Jatuh Tempo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status Pembayaran
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Periode Penagihan
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Invoice
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        const startDate = dayjs(item.periode_penagihan);
                                        const endDate = startDate.add(29, 'day');
                                        const formattedPeriod = `${startDate.format('YYYY-MM-DD')} - ${endDate.format('YYYY-MM-DD')}`;
                                        const dueDate = dayjs(item.tanggal_jatuh_tempo);
                                        const daysUntilDue = dueDate.diff(dayjs(), 'day');

                                        return (
                                            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                <td className="px-6 py-4">{item.id_starlink}</td>
                                                <td className="px-6 py-4">{item.email}</td>
                                                <td className="px-6 py-4">{item.nomor_seri}</td>
                                                <td className="px-6 py-4">{item.nomor_kits}</td>
                                                <td className="px-6 py-4">{daysUntilDue} hari lagi</td>
                                                <td className="px-6 py-4">{item.status_pembayaran}</td>
                                                <td className="px-6 py-4">{formattedPeriod}</td>
                                                <td className="px-6 py-4">
                                                    <a href={`/storage/invoices/${item.invoice_path}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                                        View Invoice
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Update Pembayaran</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Status Pembayaran</label>
                            <input
                                type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Invoice Path</label>
                            <input
                                type="text"
                                value={invoice}
                                onChange={(e) => setInvoice(e.target.value)}
                                className="mt-1 block w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setShowPopup(false)} className="mr-4 px-4 py-2 bg-gray-300 rounded">Batal</button>
                            <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}