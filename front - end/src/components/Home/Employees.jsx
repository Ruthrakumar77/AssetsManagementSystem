import React, { useEffect, useState } from "react";
import { EmployeeEditModel } from "../EmployeeEditModel";
import axios from "axios";
import { toast } from "react-hot-toast"

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editEmployee, setEditEmployee] = useState({});
    const [search, setSearch] = useState("")

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
            // toast.loading("Deleting........"), { id: "delete" }
            await axios.delete("http://localhost:8080/api/v1/user/delete/employee",
                { withCredentials: true, headers: { userid: id } })
            fetchEmployees()  // refresh after delete
        } catch (error) {
            console.log("Error deleting Employee : ", error)
        }
    }

    const filteredEmployees = employees.filter((employee) => {
        return (
            employee.name?.toLowerCase().includes(search.toLowerCase()) ||
            employee.email?.toLowerCase().includes(search.toLowerCase()) ||
            employee.mobile?.toString().toLowerCase().includes(search.toLowerCase())
        );
    });

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search for users"
                    />
                </div>
                {/* Add Button  */}
                <div>
                    <button className="text-md text-white bg-blue-500 hover:bg-white hover:text-blue-500 py-2 px-2 me-4 rounded-sm border border-blue-400" onClick={addEmployeeModel}>ADD EMPLOYEE</button>
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
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
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
                                        <div className={`h-2.5 w-2.5 rounded-full me-2
                                        ${employee.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
                                        </div>
                                        {employee.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex w-full justify-start gap-4">
                                    <button
                                        className="text-md text-white hover:underline bg-blue-500 py-2 px-2 rounded-full"
                                        onClick={() => handleModelOpen(employee)}>
                                        Edit user
                                    </button>
                                    <button className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full" onClick={() => handleDelete(employee._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-6 text-gray-500 dark:text-gray-400"
                            >
                                No employees found
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>

            {
                isModalOpen && (
                    <EmployeeEditModel handleModelClose={handleModelClose} editEmployee={editEmployee} />
                )
            }
        </div >
    );
};

export default Employees;