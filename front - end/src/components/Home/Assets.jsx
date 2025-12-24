
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import AssetEditModal from "../AssetEditModel"
import { useNavigate } from "react-router-dom"

function Assets() {
    const [assets, setAssets] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editAsset, setEditAsset] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (!isModalOpen) {
            getAssets()
        }
    }, [isModalOpen])
    async function getAssets() {
        try {
            let response = await axios.get("http://localhost:8080/api/v1/asset-model/all/items", { withCredentials: true })
            setAssets(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            toast.loading("......Deleting", { id: "delete" })
            await axios.delete(`http://localhost:8080/api/v1/asset-model/delete?id=${id}`, { withCredentials: true })
            getAssets()
            toast.success("Asset Model Deleted", { id: "delete" })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.error, { id: "delete" })
        }
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
        setEditAsset({})
    }
    const handleEdit = (asset) => {
        setEditAsset(asset)
        setIsModalOpen(true)
    }
    const navigateToShowItems = (id) => {
        navigate(`/asset-model/${id}`)
    }
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-2 bg-white dark:bg-gray-900">
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                    {/* ADD BUTTON */}
                    <div>
                        <button className="text-md text-white  hover:bg-white hover:text-blue-500 bg-blue-500 py-2 px-2 rounded-sm border border-blue-400" onClick={() => setIsModalOpen(true)}>ADD ASSET MODEL</button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manufacture
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stocks
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets.map((asset) => {
                                return (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{asset.name}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className="text-base font-semibold">{asset.category}</div>
                                        </td>
                                        <td>
                                            <div className="text-base font-semibold">{asset.manufacturer}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {asset.items.length}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 flex w-full justify-start gap-4">

                                            <button className="text-md text-white  hover:underline bg-blue-500 py-2 px-2 rounded-full"
                                                onClick={() => handleEdit(asset)}>Edit Asset</button>
                                            <button className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full"
                                                onClick={() => handleDelete(asset._id)}
                                            > Delete</button>
                                            <button className="text-md text-white hover:underline bg-green-500 py-2 px-2 rounded-full cursor-pointer"
                                                onClick={() => navigateToShowItems(asset._id)}
                                            > Items</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {isModalOpen && <AssetEditModal handleModalClose={handleModalClose} editAsset={editAsset} />}
        </>
    )
}
export default Assets
