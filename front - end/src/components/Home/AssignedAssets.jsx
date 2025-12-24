import axios from "axios";
import { useEffect, useState } from "react";
import {
    Search,
    ArrowUpDown,
    Pencil,
    RotateCcw,
} from "lucide-react"; // lucide-react icons


function AssignedAssets() {
    const [assignedAssets, setAssignedAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/assigned-asset/all",
                { withCredentials: true }
            );
            setAssignedAssets(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full bg-white shadow rounded-lg">
            {/* Header */}
            <div className="px-6 py-5 border-b flex flex-col gap-5 md:flex-row justify-between md:items-center">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Assigned Assets</h2>
                    <p className="text-gray-500 text-sm">List of all assigned assets</p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute w-5 h-5 left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <p className="text-center py-6 text-gray-500">Loading...</p>
                ) : assignedAssets.length === 0 ? (
                    <p className="text-center py-6 text-gray-500">No assigned assets found</p>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                {["Asset", "Assigned To", "Status", "Assigned Date", "Action Buttons"].map(
                                    (title, index) => (
                                        <th
                                            key={index}
                                            className="bg-gray-50 border-y p-4 text-gray-600 text-sm font-medium hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="flex items-center justify-between">
                                                {title}
                                                {index !== 4 && (
                                                    <ArrowUpDown className="w-4 h-4 opacity-60" />
                                                )}
                                            </div>
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {assignedAssets.map((row) => (
                                <tr key={row._id} className="border-b hover:bg-gray-50">
                                    {/* Asset */}
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-800">
                                                {row.assetItem?.model?.name || "N/A"}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                SN: {row.assetItem?.serialNumber}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Assigned To */}
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-800">
                                                {row.assignedTo?.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {row.assignedTo?.email}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="p-4">
                                        <span
                                            className={`px-2 py-0.5 text-xs rounded font-medium ${row.status === "pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : row.status === "active"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-gray-200 text-gray-600"
                                                }`}
                                        >
                                            {row.status}
                                        </span>
                                    </td>

                                    {/* Assigned Date */}
                                    <td className="p-4 text-sm text-gray-700">
                                        {new Date(row.assignedDate).toLocaleDateString()}
                                    </td>

                                    {/* Action Buttons */}
                                    <td className="p-4 flex gap-2">
                                        <button className="p-2 border rounded hover:bg-gray-100">
                                            <Pencil className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs rounded flex items-center gap-1">
                                            <RotateCcw className="w-4 h-4" />
                                            Return Asset
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Footer */}
            {/* <div className="flex justify-between items-center p-4 border-t">
                <span className="text-sm text-gray-600">Total: {assignedAssets.length}</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div> */}
        </div>
    );
}

export default AssignedAssets;