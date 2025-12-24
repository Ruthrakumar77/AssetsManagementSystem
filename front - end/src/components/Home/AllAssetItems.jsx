import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AssetItemModal from "../AssetItemModal"

function AllAssetItems() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("add")
    const [modalItem, setModalItem] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(null)

    useEffect(() => {
        fetchAllItems()
    }, [id])

    async function fetchAllItems() {
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/asset-model/${id}`, { withCredentials: true })
            setData(response.data || {})
        } catch (error) {
            console.error("Failed to fetch items:", error)
        } finally {
            setLoading(false)
        }
    }

    function openAdd() {
        setModalMode("add")
        setModalItem(null)
        setModalOpen(true)
    }

    function openEdit(item) {
        setModalMode("edit")
        setModalItem(item)
        setModalOpen(true)
    }

    async function handleDelete(itemId) {
        if (!window.confirm("Are you sure you want to delete this item? This action cannot be undone.")) return

        setDeleteLoading(itemId)
        try {
            await axios.delete(`http://localhost:8080/api/v1/asset-item/delete?id=${itemId}`, { withCredentials: true })
            await fetchAllItems()
        } catch (error) {
            console.error("Failed to delete item:", error)
            alert("Failed to delete item. Please try again.")
        } finally {
            setDeleteLoading(null)
        }
    }

    async function handleSave(item) {
        try {
            if (modalMode === "edit") {
                const itemId = item._id || item.id
                await axios.put(`http://localhost:8080/api/v1/asset-item/edit/${itemId}`, item, { withCredentials: true })
            } else {
                await axios.post(`http://localhost:8080/api/v1/asset-item/add`, { ...item, model: id }, { withCredentials: true })
            }
            setModalOpen(false)
            await fetchAllItems()
        } catch (error) {
            console.error("Failed to save item:", error)
            throw error // Re-throw to let modal handle error display
        }
    }

    const items = (data && data.items) || []

    function formatDate(iso) {
        if (!iso) return "-"
        try {
            return new Date(iso).toLocaleDateString()
        } catch (e) {
            return iso
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="text-gray-600">Loading asset items...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            {data?.name || `Model ${id}`}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                                <span className="font-medium">Category:</span>
                                <span>{data?.category || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-medium">Manufacturer:</span>
                                <span>{data?.manufacturer || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-medium">Depreciation:</span>
                                <span>{data?.depreciationMethod || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="font-medium">Useful Life:</span>
                                <span>{data?.usefulLifeYears || "-"} years</span>
                            </div>
                        </div>

                        {data?.description && (
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {data.description}
                            </p>
                        )}
                    </div>

                    <button
                        onClick={openAdd}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Item
                    </button>
                </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {items.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                        <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
                        <p className="text-gray-500 mb-4">Get started by adding your first asset item.</p>
                        <button
                            onClick={openAdd}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Add First Item
                        </button>
                    </div>
                ) : (
                    items.map((item) => {
                        const key = item._id || item.id
                        return (
                            <div
                                key={key}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden"
                            >
                                <div className="p-4 md:p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="font-semibold text-gray-900 text-lg truncate">
                                            {item.serialNumber || "No Serial"}
                                        </h3>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'active' ? 'bg-green-100 text-green-800' :
                                            item.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                                                item.status === 'retired' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {item.status || 'unknown'}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Purchase Date</span>
                                            <span className="text-sm text-gray-900">{formatDate(item.purchaseDate)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Purchase Cost</span>
                                            <span className="text-sm text-gray-900">
                                                {item.purchaseCost ? `₹${item.purchaseCost.toLocaleString()}` : "-"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Location</span>
                                            <span className="text-sm text-gray-900 truncate ml-2">{item.location || "-"}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-600">Condition</span>
                                            <span className="text-sm text-gray-900 capitalize">{item.condition || "-"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 md:px-6 py-3 border-t border-gray-200">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(key)}
                                            disabled={deleteLoading === key}
                                            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1"
                                        >
                                            {deleteLoading === key ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                                                    Deleting...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Delete
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>

            <AssetItemModal
                isOpen={modalOpen}
                mode={modalMode}
                initialItem={modalItem}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
            />
        </div>
    )
}

export default AllAssetItems