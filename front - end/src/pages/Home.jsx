import { Sidebar } from '../components/Home/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()


  return (
    <>
      <div className='flex w-full min-h-screen '>
        {/* Sidebar */}
        <div className="w-[18%] bg-amber-500 h-screen sticky top-0">
          <Sidebar />
        </div>
        {/* main content */}
        <div className="flex-1 bg-blue-100 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Home