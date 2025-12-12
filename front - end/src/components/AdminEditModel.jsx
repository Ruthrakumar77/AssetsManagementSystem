// import axios from 'axios'
// import React, { useState, useEffect } from 'react'

// export const AdminEditModel = ({ handleModelClose, editAdmin }) => {

//     // FIX 1: isEdit logic is correct
//     const isEdit = editAdmin && Object.keys(editAdmin).length > 0;

//     // FIX 2: Proper initial values (avoid undefined errors)
//     const [adminDetails, setAdminDetails] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         department: "",
//         designation: "",
//         status: "active",
//         role: "admin"   // default when adding
//     });

//     // FIX 3: When editing, update form
//     useEffect(() => {
//         if (isEdit) {
//             setAdminDetails({
//                 name: editAdmin.name || "",
//                 email: editAdmin.email || "",
//                 mobile: editAdmin.mobile || "",
//                 department: editAdmin.department || "",
//                 designation: editAdmin.designation || "",
//                 status: editAdmin.status || "active",
//                 role: editAdmin.role || "admin",
//                 _id: editAdmin._id
//             });
//         }
//     }, [editAdmin]);

//     function onChangeHandler(event) {
//         let { name, value } = event.target;
//         setAdminDetails({ ...adminDetails, [name]: value });
//     }

//     async function handleSaveChanges(event) {
//         event.preventDefault();

//         if (isEdit) {
//             // UPDATE ADMIN
//             try {
//                 await axios.put(
//                     "http://localhost:8080/api/v1/user/edit/admin",
//                     adminDetails,
//                     {
//                         withCredentials: true,
//                         headers: { userid: adminDetails._id }
//                     }
//                 );

//                 handleModelClose();
//             } catch (error) {
//                 console.log(error);
//             }

//         } else {
//             // ADD NEW ADMIN (role must be ADMIN)
//             try {
//                 await axios.post(
//                     "http://localhost:8080/api/v1/user/add/admin",
//                     { ...adminDetails, role: "admin" },
//                     { withCredentials: true }
//                 );

//                 handleModelClose();
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }

//     return (
//         <>
//             <div className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
//                 <div className="relative w-full max-w-2xl max-h-full">

//                     <form
//                         className={`relative ${isEdit ? "bg-white" : "bg-gray-300"} rounded-lg shadow-sm dark:bg-gray-700`}
//                         onSubmit={handleSaveChanges}
//                     >

//                         <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
//                             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                                 {isEdit ? "Edit Admin Details" : "Give Admin Details"}
//                             </h3>

//                             <button
//                                 onClick={handleModelClose}
//                                 type="button"
//                                 className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                             >
//                                 <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
//                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
//                                 </svg>
//                             </button>
//                         </div>

//                         <div className="p-6 space-y-6">
//                             <div className="grid grid-cols-6 gap-6">

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         id="name"
//                                         required
//                                         className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                                         value={adminDetails.name}
//                                         onChange={onChangeHandler}
//                                     />
//                                 </div>

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         id="email"
//                                         required
//                                         className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                                         value={adminDetails.email}
//                                         onChange={onChangeHandler}
//                                     />
//                                 </div>

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
//                                     <input
//                                         type="number"
//                                         name="mobile"
//                                         id="mobile"
//                                         required
//                                         className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                                         value={adminDetails.mobile}
//                                         onChange={onChangeHandler}
//                                     />
//                                 </div>

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
//                                     <input
//                                         type="text"
//                                         name="department"
//                                         id="department"
//                                         className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                                         value={adminDetails.department}
//                                         onChange={onChangeHandler}
//                                     />
//                                 </div>

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
//                                     <input
//                                         type="text"
//                                         name="designation"
//                                         id="designation"
//                                         className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                                         value={adminDetails.designation}
//                                         onChange={onChangeHandler}
//                                     />
//                                 </div>

//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
//                                     <select
//                                         name="status"
//                                         id="status"
//                                         className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                                         value={adminDetails.status}
//                                         onChange={onChangeHandler}
//                                     >
//                                         <option value="active">Active</option>
//                                         <option value="inactive">Inactive</option>
//                                     </select>
//                                 </div>

//                             </div>
//                         </div>

//                         <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b">
//                             <button
//                                 type="submit"
//                                 className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
//                             >
//                                 {isEdit ? "Save Changes" : "Add Admin"}
//                             </button>
//                         </div>

//                     </form>

//                 </div>
//             </div>
//         </>
//     )
// }



import axios from 'axios'
import React, { useState } from 'react'

export const AdminEditModel = ({ handleModelClose, editAdmin }) => {

    // Safe check for undefined/null
    const isEdit = editAdmin && Object.keys(editAdmin).length > 0;

    const [adminDetails, setAdminDetails] = useState(isEdit ? editAdmin : {});

    function onChangeHandler(event) {
        let { name, value } = event.target;
        setAdminDetails({ ...adminDetails, [name]: value });
    }

    async function handleSaveChanges(event) {
        event.preventDefault();

        if (isEdit) {
            try {
                await axios.put(
                    "http://localhost:8080/api/v1/user/edit/admin",
                    adminDetails,
                    {
                        withCredentials: true,
                        headers: { userid: adminDetails._id }
                    }
                );
                handleModelClose();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await axios.post(
                    "http://localhost:8080/api/v1/user/add/admin",
                    adminDetails,
                    { withCredentials: true }
                );
                handleModelClose();
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50 items-center justify-center flex w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">

                    <form
                        className={`relative ${isEdit ? "bg-white" : "bg-gray-300"} rounded-lg shadow-sm dark:bg-gray-700`}
                        onSubmit={handleSaveChanges}
                    >

                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {isEdit ? "Edit Admin Details" : "Give Admin Details"}
                            </h3>
                            <button
                                onClick={handleModelClose}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg className="w-3 h-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={adminDetails.name ?? ""}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={adminDetails.email ?? ""}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile</label>
                                    <input
                                        type="number"
                                        name="mobile"
                                        id="mobile"
                                        required
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={adminDetails.mobile ?? ""}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        id="department"
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={adminDetails.department ?? ""}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        id="designation"
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={adminDetails.designation ?? ""}
                                        onChange={onChangeHandler}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                    <select
                                        name="status"
                                        id="status"
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        value={adminDetails.status ?? ""}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
                            >
                                {isEdit ? "Save Changes" : "Add Admin"}
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}
