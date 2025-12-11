import axios from 'axios'
import React, { useState } from 'react'

export const AdminEditModel = ({ handleModelClose, editAdmin }) => {

    const isEdit = Object.keys(editAdmin).length > 0  // edit mode or add mode
    const [adminDetails, setAdminDetails] = useState(isEdit ? editAdmin : {})

    function onChangeHandler(event) {
        let name = event.target.name
        let value = event.target.value
        setAdminDetails({ ...adminDetails, [name]: value })
    }

    async function handleSaveChanges(event) {
        event.preventDefault()
        // console.log(adminDetails)
        if (isEdit) {
            try {
                await axios.put("http://localhost:8080/api/v1/user/edit/admin", adminDetails,
                    { withCredentials: true, headers: { userid: adminDetails._id } })
                handleModelClose()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await axios.post("http://localhost:8080/api/v1/user/add/admin", adminDetails,
                    { withCredentials: true })
                handleModelClose()
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <form className={`relative ${isEdit ? " bg-white" : "bg-gray-300"} rounded-lg shadow-sm dark:bg-gray-700`} onSubmit={handleSaveChanges}>
                        {/* <!-- Modal header --> */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {isEdit ? "Edit User" : "Give Employee Details"}
                            </h3>
                            <button onClick={handleModelClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name</label>
                                    <input type="text" name="name" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={onChangeHandler}
                                        value={adminDetails.name ? adminDetails.name : ""} />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="email" name="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={onChangeHandler}
                                        value={adminDetails.email ? adminDetails.email : ""} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                    <input type="number" name="mobile" id="mobile" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        onChange={onChangeHandler} value={adminDetails.mobile ? adminDetails.mobile : ""} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                    <input type="text" name="department" id="department" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChangeHandler}
                                        value={adminDetails.department ? adminDetails.department : ""} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                                    <input type="text" name="designation" id="designation" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChangeHandler}
                                        value={adminDetails.designation ? adminDetails.designation : ""} />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                    <select type="text" name="status" id="status" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={onChangeHandler}
                                        value={adminDetails.status ? adminDetails.status : ""}>
                                        <option value="active">Active</option>
                                        <option value="inactive">InActive</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        {/* <!-- Modal footer --> */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >{isEdit ? "save Changes" : "Add Employee"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
