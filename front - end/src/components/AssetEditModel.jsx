import axios from "axios"
import { useState } from "react"

function AssetEditModal({ handleModalClose, editAsset }) {
    const isEdit = Object.keys(editAsset).length > 0

    const [assetDetails, setAssetDetails] = useState(isEdit ? editAsset : {})

    function onChangeHandler(event) {
        let name = event.target.name
        let value = event.target.value

        setAssetDetails({
            ...assetDetails,
            [name]: name === "usefulLifeYears" ? Number(value) : value
        })
    }

    async function saveChanges(event) {
        event.preventDefault()

        // ❗ remove backend-only fields
        const { _id, createdAt, updatedAt, __v, ...payload } = assetDetails

        try {
            if (isEdit) {
                await axios.put(
                    `http://localhost:8080/api/v1/asset-model/edit/${_id}`,
                    payload,
                    { withCredentials: true }
                )
            } else {
                await axios.post(
                    "http://localhost:8080/api/v1/asset-model/add",
                    payload,
                    { withCredentials: true }
                )
            }
            handleModalClose()
        } catch (error) {
            console.log(error.response?.data || error)
        }
    }

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative w-full max-w-2xl max-h-full">

                    <form
                        className={`relative ${isEdit ? "bg-white" : "bg-gray-300"} rounded-lg shadow-sm dark:bg-gray-700`}
                        onSubmit={saveChanges}
                    >
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {isEdit ? "Edit Asset Details" : "Add New Asset Model"}
                            </h3>
                            <button onClick={handleModalClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                ✕
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={assetDetails.name || ""}
                                        onChange={onChangeHandler}
                                        required
                                        className="shadow-xs bg-gray-50 border rounded-lg w-full p-2.5"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Category</label>
                                    <input
                                        type="text"   /* ✅ FIXED */
                                        name="category"
                                        value={assetDetails.category || ""}
                                        onChange={onChangeHandler}
                                        required
                                        className="shadow-xs bg-gray-50 border rounded-lg w-full p-2.5"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Manufacture</label>
                                    <input
                                        type="text"
                                        name="manufacturer"
                                        value={assetDetails.manufacturer || ""}
                                        onChange={onChangeHandler}
                                        required
                                        className="shadow-xs bg-gray-50 border rounded-lg w-full p-2.5"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Use Life Years</label>
                                    <input
                                        type="number"
                                        name="usefulLifeYears"
                                        value={assetDetails.usefulLifeYears || ""}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border rounded-lg w-full p-2.5"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Depreciation Method</label>
                                    <select
                                        name="depreciationMethod"
                                        value={assetDetails.depreciationMethod || "straight_line"}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border rounded-lg w-full p-2.5"
                                    >
                                        {/* ✅ MATCH BACKEND ENUM */}
                                        <option value="straight_line">Straight Line</option>
                                        <option value="reducing_balance">Reducing Balance</option>
                                    </select>
                                </div>

                                <div className="col-span-12 sm:col-span-6">
                                    <label className="block mb-2 text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={assetDetails.description || ""}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border rounded-lg w-full p-2.5"
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-3 border-t">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
                            >
                                {isEdit ? "Save Changes" : "Add Assets"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AssetEditModal







// import axios from "axios"
// import { useState } from "react"

// function AssetEditModal({ handleModalClose, editAsset }) {
//     const isEdit = Object.keys(editAsset).length > 0 // edit mode or add mode
//     // console.log(editAsset)

//     const [assetDetails, setAssetDetails] = useState(isEdit ? editAsset : {})

//     function onChangeHandler(event) {
//         let name = event.target.name
//         let value = event.target.value
//         setAssetDetails({ ...assetDetails, [name]: value })
//     }

//     async function saveChanges(event) {
//         event.preventDefault()
//         if (isEdit) {
//             try {
//                 await axios.put(
//                     `http://localhost:8080/api/v1/asset-model/edit/${assetDetails._id}`,
//                     assetDetails, { withCredentials: true, })
//                 handleModalClose()
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         else {
//             try {
//                 await axios.post("http://localhost:8080/api/v1/asset-model/add",
//                     { ...assetDetails },
//                     { withCredentials: true, })
//                 handleModalClose()
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//     }

//     return (
//         <>
//             {/* <!-- Edit user modal --> */}
//             <div className={`fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
//                 <div className="relative w-full max-w-2xl max-h-full">
//                     {/* <!-- Modal content --> */}
//                     <form className={`relative ${isEdit ? "bg-white" : "bg-gray-300"} rounded-lg shadow-sm dark:bg-gray-700`} onSubmit={saveChanges}>
//                         {/* <!-- Modal header --> */}
//                         <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                                 {isEdit ? "Edit Asset Details" : "Add New Asset Model"}
//                             </h3>
//                             <button onClick={handleModalClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
//                                 <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                                 </svg>
//                                 <span className="sr-only">Close modal</span>
//                             </button>
//                         </div>
//                         {/* <!-- Modal body --> */}
//                         <div className="p-6 space-y-6">
//                             <div className="grid grid-cols-6 gap-6">
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                                     <input type="text" name="name" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={assetDetails.name ? assetDetails.name : ""} onChange={onChangeHandler} />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
//                                     <input type="category" name="category" id="category" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={assetDetails.category ? assetDetails.category : ""} onChange={onChangeHandler} />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="manufacturer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manufacture</label>
//                                     <input type="text" name="manufacturer" id="manufacturer" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={assetDetails.manufacturer ? assetDetails.manufacturer : ""} onChange={onChangeHandler} />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="usefulLifeYears" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Use Life Years</label>
//                                     <input type="number" name="usefulLifeYears" id="usefulLifeYears" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assetDetails.usefulLifeYears ? assetDetails.usefulLifeYears : ""} onChange={onChangeHandler} />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="depreciationMethod" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Depreciation Method</label>
//                                     <select type="text" name="depreciationMethod" id="depreciationMethod" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assetDetails.depreciationMethod ? assetDetails.depreciationMethod : ""} onChange={onChangeHandler}>
//                                         <option value="straightline">Straight Line</option>
//                                         <option value="reducingbalance">Reducing Balance</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-span-12 sm:col-span-6">
//                                     <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
//                                     <textarea type="text" name="description" id="description" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assetDetails.description ? assetDetails.description : ""} onChange={onChangeHandler} />
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <!-- Modal footer --> */}
//                         <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
//                             <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isEdit ? "Save Changes" : "Add Assets"}</button>
//                         </div>
//                     </form>
//                 </div >
//             </div >
//         </>
//     )
// }
// export default AssetEditModal
