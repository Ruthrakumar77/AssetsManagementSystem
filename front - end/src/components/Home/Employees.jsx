import React, { useEffect, useState } from "react";
import { EmployeeEditModel } from "../EmployeeEditModel";
import axios from "axios";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState({})

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/v1/user/read/employees", // removed space before http
                { withCredentials: true }
            );
            setEmployees(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, [editEmployee]);

    const handleModelOpen = (employee) => {
        setEditEmployee(employee)
        setIsModalOpen(true)
    }
    const handleModelClose = () => {
        setEditEmployee({})
        setIsModalOpen(false)
    }

    const addEmployeeModel = () => {
        setEditEmployee({}) // for safe adding
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure want to delete this Employee ?")) return;

        try {
            await axios.delete("http://localhost:8080/api/v1/user/delete/employee",
                { headers: { userid: id } })
            fetchEmployees()  // refresh after delete
        } catch (error) {
            console.log("Error deleting Employee : ", error)
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-users"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search for users"
                    />
                </div>
                {/* Add Button  */}
                <div>
                    <button className="text-md text-white bg-blue-500 hover:bg-white hover:text-blue-500 py-2 px-2 rounded-sm border border-blue-400" onClick={addEmployeeModel}>Add Employee</button>
                </div>
            </div>
            {/* Mapping employyes */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Department</th>
                        <th className="px-6 py-3">Contact No</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee) => (
                        <tr
                            key={employee._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="ps-3">
                                    <div className="text-base font-semibold">{employee.name}</div>
                                    <div className="font-normal text-gray-500">
                                        {employee.email}
                                    </div>
                                </div>
                            </th>
                            <td className="px-6 py-4">
                                <div className="text-base font-semibold">
                                    {employee.department}
                                </div>
                                <div className="font-normal text-gray-500">
                                    {employee.designation}
                                </div>
                            </td>
                            <td className="px-6 py-4">{employee.mobile}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                                    Active
                                </div>
                            </td>
                            <td className="px-6 py-4 flex w-full justify-start gap-4">
                                <button
                                    className="text-md text-white hover:underline bg-blue-500 py-2 px-2 rounded-full"
                                    onClick={() => handleModelOpen(employee)}>
                                    Edit user
                                </button>
                                <button className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full" onClick={handleDelete}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <EmployeeEditModel handleModelClose={handleModelClose} editEmployee={editEmployee} />
            )}
        </div>
    );
};

export default Employees;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { EmployeeEditModel } from "../EmployeeEditModel";


// axios.defaults.withCredentials = true;

// export const Employees = () => {
//     const [employees, setEmployees] = useState([]); // store employee list
//     const [isModelOpen, setIsModelOpen] = useState(false); // open/close edit modal
//     const [selectedEmployee, setSelectedEmployee] = useState(null); // currently editing employee
//     const [search, setSearch] = useState(""); // search input

//     // ✅ Fetch employees from backend when component loads
//     useEffect(() => {
//         fetchEmployees();
//     }, []);

//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/v1/user/read/employees");
//             console.log(response)
//             if (response.data.message === "No employees found") {
//                 setEmployees([]);
//             } else {
//                 setEmployees(response.data)
//             }
//         } catch (error) {
//             console.error("Error fetching employees:", error);
//         }
//     };

//     // ✅ Handle edit click
//     const handleEditClick = (employee) => {
//         setSelectedEmployee(employee);
//         setIsModelOpen(true);
//     };

//     // ✅ Handle delete click
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this employee?")) return;

//         try {
//             await axios.delete("http://localhost:8080/api/v1/user/delete/employee", { headers: { userid: id } })
//             fetchEmployees(); // refresh after delete
//         } catch (error) {
//             console.error("Error deleting employee:", error);
//         }
//     };

//     // ✅ Filter employees by search
//     const filteredEmployees = employees.filter(
//         (emp) =>
//             emp.name?.toLowerCase().includes(search.toLowerCase()) ||
//             emp.email?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <>
//             <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                 {/* 🔍 Search Bar */}
//                 <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
//                     <label htmlFor="table-search" className="sr-only">
//                         Search
//                     </label>
//                     <div className="relative">
//                         <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//                             <svg
//                                 className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                                 aria-hidden="true"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 20 20"
//                             >
//                                 <path
//                                     stroke="currentColor"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                                 />
//                             </svg>
//                         </div>
//                         <input
//                             type="text"
//                             id="table-search-users"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                             placeholder="Search for employees"
//                         />
//                     </div>
//                 </div>

//                 {/* 📋 Employees Table */}
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr>
//                             <th scope="col" className="px-6 py-3">
//                                 Name
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Department
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Contact No
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Status
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Action
//                             </th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {filteredEmployees.length > 0 ? (
//                             filteredEmployees.map((emp) => (
//                                 <tr
//                                     key={emp._id}
//                                     className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
//                                 >
//                                     <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
//                                         <div className="text-base font-semibold">{emp.name}</div>
//                                         <div className="font-normal text-gray-500">{emp.email}</div>
//                                     </td>

//                                     <td className="px-6 py-4">
//                                         <div className="text-base font-semibold">{emp.department}</div>
//                                         <div className="font-normal text-gray-500">{emp.designation}</div>
//                                     </td>
//                                     <td className="px-6 py-4">{emp.mobile || "—"}</td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex items-center">
//                                             <div
//                                                 className={`h-2.5 w-2.5 rounded-full me-2 ${emp.status === "active" ? "bg-green-500" : "bg-red-500"
//                                                     }`}
//                                             ></div>
//                                             {emp.status || "Inactive"}
//                                         </div>
//                                     </td>

//                                     <td className="px-6 py-4 flex gap-3">
//                                         <button
//                                             className="text-md text-white bg-blue-500 py-2 px-3 rounded-full hover:bg-blue-600"
//                                             onClick={() => handleEditClick(emp)}
//                                         >
//                                             Edit
//                                         </button>
//                                         <button
//                                             className="text-md text-white bg-red-500 py-2 px-3 rounded-full hover:bg-red-600"
//                                             onClick={() => handleDelete(emp._id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td
//                                     colSpan="5"
//                                     className="text-center py-6 text-gray-500 dark:text-gray-400"
//                                 >
//                                     No employees found
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* ✏️ Edit Modal */}
//             {isModelOpen && (
//                 <EmployeeEditModel
//                     setIsModelOpen={setIsModelOpen}
//                     employee={selectedEmployee}
//                     refreshEmployees={fetchEmployees}
//                 />
//             )}
//         </>
//     );
// };




// // import React, { useEffect, useState } from 'react'
// // import { EmployeeEditModel } from '../EmployeeEditModel'
// // import axios from 'axios'

// // export const Employees = () => {
// //     const [isModelOpen, setIsModelOpen] = useState(false)

// //     return (
// //         <>
// //             <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
// //                 <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4            md:space-y-0 pb-4 bg-white dark:bg-gray-900">

// //                     {/* search Bar  */}
// //                     <label for="table-search" className="sr-only">Search</label>
// //                     <div className="relative">
// //                         <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
// //                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
// //                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
// //                             </svg>
// //                         </div>
// //                         <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
// //                     </div>
// //                 </div>

// //                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
// //                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
// //                         <tr>
// //                             <th scope="col" className="px-6 py-3">
// //                                 Name
// //                             </th>
// //                             <th scope="col" className="px-6 py-3">
// //                                 Department
// //                             </th>
// //                             <th scope="col" className="px-6 py-3">
// //                                 Contact No
// //                             </th>
// //                             <th scope="col" className="px-6 py-3">
// //                                 Status
// //                             </th>
// //                             <th scope="col" className="px-6 py-3">
// //                                 Action
// //                             </th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">

// //                             <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">

// //                                 <div className="ps-3">
// //                                     <div className="text-base font-semibold">Neil Sims</div>
// //                                     <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
// //                                 </div>
// //                             </th>
// //                             <td className="px-6 py-4">
// //                                 <div className="text-base font-semibold">Hr</div>
// //                                 <div className="font-normal text-gray-500">Client Support</div>
// //                             </td>
// //                             <td className="px-6 py-4">
// //                                 <div className="text-base font-semibold">9080745689</div>
// //                             </td>
// //                             <td className="px-6 py-4">
// //                                 <div className="flex items-center">
// //                                     <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Active
// //                                 </div>
// //                             </td>
// //                             <td className="px-6 py-4 flex w-full justify-start gap-4">
// //                                 <button className="text-md text-white hover:underline bg-blue-500 py-2 px-2 rounded-full" onClick={() => setIsModelOpen(true)}>Edit user</button>
// //                                 <button className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full">Delete</button>
// //                             </td>
// //                         </tr>

// //                     </tbody>
// //                 </table>
// //             </div>
// //             {isModelOpen && <EmployeeEditModel setIsModelOpen={setIsModelOpen} />}
// //         </>
// //     )
// // }
