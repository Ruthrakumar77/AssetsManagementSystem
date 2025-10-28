import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

let sidebarLinks = [
    {
        role: "employee", links: [{ label: "Dashboard", path: "/" }, { label: "My-Assets", path: "myAssets" }, { label: "Requests", path: "requests" }]
    },
    {
        role: "admin", links: [{ label: "Dashboard", path: "/" }, { label: "Assets", path: "assets" },
        { label: "Employees", path: "employees" }, { label: "Assigned-Asssets", path: "assigned-assets" },
        { label: "Requests", path: "requests" }]
    },
    {
        role: "super admin", links: [{ label: "Dashboard", path: "/" }, { label: "Admins", path: "admins" },
        { label: "Employees", path: "employees" }, { label: "Assets", path: "assets" },
        { label: "Assigned-Asssets", path: "assigned-assets" }, { label: "Requests", path: "requests" }]
    }
]

export const Sidebar = () => {

    const { logout, user } = useAuth()
    const navigate = useNavigate()
    let links = sidebarLinks.find((linkObj) => linkObj.role === user.role)?.links

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }
    return (
        <>
            <aside className='flex flex-col py-7 items-center justify-between h-screen'>
                <div>
                    <h1 className='text-red-600 text-2xl text-center font-bold'>Ruthra's</h1>
                </div>

                <div className='flex flex-col py-4 px-2 w-4/5 gap-8 justify-center'>
                    {
                        links.map(myLink => {
                            return <Link to={myLink.path} key={myLink.label} className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold cursor-pointer hover:bg-gray-200 transition-all'>{myLink.label}</Link>
                        })
                    }
                </div>

                <div className='flex flex-col py-4 px-2 w-4/5 gap-4 items-center justify-end'>

                    <Link to={''} className='shadow-md shadow-gray-600 h-10 rounded-2xl text-center content-center text-xl font-semibold w-full hover:bg-gray-200'>Profile</Link>

                    <button onClick={handleLogout} className='bg-red-500 rounded-2xl h-10 w-1/2 text-xl font-semibold text-white cursor-pointer hover:bg-white hover:text-red-500 transition-all'>Logout</button>
                </div>
            </aside>
        </>
    )
}




// let RouteLinks = [
// {
// role:"employee",links:[{label:"Dashboard",path:"/"},{label:"Employee",path:"/employees"},
// {label:"MyAssets",path:"/myAssets"},{label:"Requests",path:"/requests"}]
// },

// {
// role:"employee",links:[{label:"Dashboard",path:"/"},{label:"Employee",path:"/employees"},
// {label:"MyAssets",path:"/myAssets"},{label:"Assigned Assets",path:"/assigned-assets"},
// {label:"Requests",path:"/requests"}]
// },

// {
// role:"employee",links:[{label:"Dashboard",path:"/"},{label:"Admins",path:"/admins"},
// {label:"Employee",path:"/employees"},{label:"Assigned Assets",path:"/assigned-assets"},
// {label:"Assets",path:"/assets"},{label:"Requests",path:"/requests"}]
// }
// ]


// let links = RouteLinks.find((weblink) => weblink.role === user.role)?.links

// <div>
    // {
        // links.map(myLink => {
            // return <Link to={'myLink.path'} key={myLink.label}>{myLink.label}</Link>
        // }) 
    // }
// </div>