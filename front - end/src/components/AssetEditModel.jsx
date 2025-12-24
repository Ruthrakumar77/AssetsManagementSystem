
import axios from "axios"
import { useState } from "react"

function AssetEditModal({ handleModalClose, editAsset }) {
    const isEdit = Object.keys(editAsset).length > 0 // edit mode or add mode
    console.log(editAsset)

    const [assetDetails, setAssetDetails] = useState(isEdit ? editAsset : {})

    function onChangeHandler(event) {
        let name = event.target.name
        let value = event.target.value
        setAssetDetails({ ...assetDetails, [name]: value })
    }

    async function saveChanges(event) {
        event.preventDefault()
        if (isEdit) {
            try {
                await axios.put(`http://localhost:8080/api/v1/asset-model/edit/${assetDetails._id}`,
                    assetDetails, { withCredentials: true, })
                handleModalClose()
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                await axios.post("http://localhost:8080/api/v1/asset-model/add",
                    { ...assetDetails },
                    { withCredentials: true, })
                handleModalClose()
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <>
            {/* <!-- Edit user modal --> */}
            <div className={`fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div class="relative w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <form class={`relative ${isEdit ? "bg-white" : "bg-gray-300"} rounded-lg shadow-sm dark:bg-gray-700`} onSubmit={saveChanges}>
                        {/* <!-- Modal header --> */}
                        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                {isEdit ? "Edit Asset Details" : "Add New Asset Model"}
                            </h3>
                            <button onClick={handleModalClose} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-6 space-y-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="name" id="name" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={assetDetails.name ? assetDetails.name : ""} onChange={onChangeHandler} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label htmlFor="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <input type="category" name="category" id="category" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={assetDetails.category ? assetDetails.category : ""} onChange={onChangeHandler} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label htmlFor="manufacturer" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manufacture</label>
                                    <input type="text" name="manufacturer" id="manufacturer" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={assetDetails.manufacturer ? assetDetails.manufacturer : ""} onChange={onChangeHandler} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label htmlFor="usefulLifeYears" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Use Life Years</label>
                                    <input type="number" name="usefulLifeYears" id="usefulLifeYears" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assetDetails.usefulLifeYears ? assetDetails.usefulLifeYears : ""} onChange={onChangeHandler} />
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label htmlFor="depreciationMethod" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Depreciation Method</label>
                                    <select type="text" name="depreciationMethod" id="depreciationMethod" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assetDetails.depreciationMethod ? assetDetails.depreciationMethod : ""} onChange={onChangeHandler}>
                                        <option value="straightline">Straight Line</option>
                                        <option value="reducingbalance">Reducing Balance</option>
                                    </select>
                                </div>
                                <div class="col-span-12 sm:col-span-6">
                                    <label htmlFor="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea type="text" name="description" id="description" class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={assetDetails.description ? assetDetails.description : ""} onChange={onChangeHandler} />
                                </div>
                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div class="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isEdit ? "Save Changes" : "Add Assets"}</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}
export default AssetEditModal
