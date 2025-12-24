
import React, { useEffect, useState } from "react"

export default function AssetItemModal({ isOpen, onClose, onSave, initialItem = null, mode = "add" }) {
    const [form, setForm] = useState({
        serialNumber: "",
        purchaseDate: "",
        purchaseCost: "",
        location: "",
        status: "",
        condition: "",
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (!isOpen) {
            // Reset form and errors when modal closes
            setForm({
                serialNumber: "",
                purchaseDate: "",
                purchaseCost: "",
                location: "",
                status: "",
                condition: "",
            })
            setErrors({})
            setLoading(false)
            return
        }

        if (initialItem) {
            // normalize purchaseDate to yyyy-mm-dd for input
            const pd = initialItem.purchaseDate ? (new Date(initialItem.purchaseDate)).toISOString().slice(0, 10) : ""
            setForm({
                _id: initialItem._id || initialItem.id,
                serialNumber: initialItem.serialNumber || "",
                purchaseDate: pd,
                purchaseCost: initialItem.purchaseCost || "",
                location: initialItem.location || "",
                status: initialItem.status || "",
                condition: initialItem.condition || "",
            })
        } else {
            setForm({
                serialNumber: "",
                purchaseDate: "",
                purchaseCost: "",
                location: "",
                status: "",
                condition: ""
            })
        }
        setErrors({})
        setLoading(false)
    }, [isOpen, initialItem])

    function validateForm() {
        const newErrors = {}

        if (!form.serialNumber?.trim()) {
            newErrors.serialNumber = "Serial number is required"
        }

        if (form.purchaseCost && isNaN(Number(form.purchaseCost))) {
            newErrors.purchaseCost = "Purchase cost must be a valid number"
        }

        if (form.purchaseCost && Number(form.purchaseCost) < 0) {
            newErrors.purchaseCost = "Purchase cost cannot be negative"
        }

        if (form.purchaseDate && new Date(form.purchaseDate) > new Date()) {
            newErrors.purchaseDate = "Purchase date cannot be in the future"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    function change(key, value) {
        setForm((s) => ({ ...s, [key]: value }))
        // Clear error when user starts typing
        if (errors[key]) {
            setErrors(prev => ({ ...prev, [key]: "" }))
        }
    }

    async function submit(e) {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setLoading(true)
        try {
            const payload = { ...form }
            // convert purchaseCost back to number if provided
            if (payload.purchaseCost === "") delete payload.purchaseCost
            else payload.purchaseCost = Number(payload.purchaseCost)
            // convert purchaseDate to full ISO if provided
            if (payload.purchaseDate) payload.purchaseDate = new Date(payload.purchaseDate).toISOString()

            await onSave(payload)
            // Modal will close on successful save
        } catch (error) {
            console.error("Failed to save item:", error)
            // Keep the modal open and let user try again
        } finally {
            setLoading(false)
        }
    }

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-[#ffffffbc] flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {mode === "edit" ? "Edit Asset Item" : "Add New Asset Item"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Serial Number */}
                        <div className="space-y-2">
                            <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                                Serial Number *
                            </label>
                            <input
                                id="serialNumber"
                                type="text"
                                value={form.serialNumber}
                                onChange={(e) => change("serialNumber", e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.serialNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="Enter serial number"
                                disabled={loading}
                            />
                            {errors.serialNumber && (
                                <p className="text-red-500 text-xs mt-1">{errors.serialNumber}</p>
                            )}
                        </div>

                        {/* Purchase Date */}
                        <div className="space-y-2">
                            <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700">
                                Purchase Date
                            </label>
                            <input
                                id="purchaseDate"
                                type="date"
                                value={form.purchaseDate}
                                onChange={(e) => change("purchaseDate", e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.purchaseDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                disabled={loading}
                            />
                            {errors.purchaseDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.purchaseDate}</p>
                            )}
                        </div>

                        {/* Purchase Cost */}
                        <div className="space-y-2">
                            <label htmlFor="purchaseCost" className="block text-sm font-medium text-gray-700">
                                Purchase Cost
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    ₹
                                </span>
                                <input
                                    id="purchaseCost"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={form.purchaseCost}
                                    onChange={(e) => change("purchaseCost", e.target.value)}
                                    className={`w-full pl-8 pr-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.purchaseCost ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="0.00"
                                    disabled={loading}
                                />
                            </div>
                            {errors.purchaseCost && (
                                <p className="text-red-500 text-xs mt-1">{errors.purchaseCost}</p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                value={form.location}
                                onChange={(e) => change("location", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter location"
                                disabled={loading}
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                value={form.status}
                                onChange={(e) => change("status", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            >
                                <option value="">Select Status</option>
                                <option value="available">Available</option>
                                <option value="assigned">Assigned</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="retired">Retired</option>
                            </select>
                        </div>

                        {/* Condition */}
                        <div className="space-y-2">
                            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                                Condition
                            </label>
                            <select
                                id="condition"
                                value={form.condition}
                                onChange={(e) => change("condition", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                disabled={loading}
                            >
                                <option value="">Select Condition</option>
                                <option value="new">New</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                            </select>
                        </div>
                    </div>

                    {/* Required fields note */}
                    <div className="mt-4 md:mt-6">
                        <p className="text-xs text-gray-500">* indicates required field</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 md:mt-8 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    {mode === "edit" ? "Saving..." : "Creating..."}
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {mode === "edit" ? "Save Changes" : "Create Item"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
