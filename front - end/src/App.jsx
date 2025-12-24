import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ErrorPage from './pages/ErrorPage'
import ProtectedRoute from './ProtectedRoute'
import { Dashboard } from './components/Home/Dashboard'
import Assets from './components/Home/Assets'
import Employees from './components/Home/Employees'
import { Toaster } from 'react-hot-toast'
import Admins from './components/Home/Admins'
import { Requests } from './components/Home/Requests'
import { MyAssets } from './components/Home/MyAssets'
import AllAssetItems from './components/Home/AllAssetItems'
import AssignedAssets from './components/Home/AssignedAssets'


function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        {/* Protected route */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />}></Route>
          <Route path='assets' element={<Assets />}></Route>
          <Route path="asset-model/:id" element={<AllAssetItems />} />
          <Route path='employees' element={<Employees />}></Route>
          <Route path='assigned-assets' element={<AssignedAssets />}></Route>
          <Route path='admins' element={< Admins />}></Route>
          <Route path='myAssets' element={<MyAssets />}></Route>
          <Route path='requests' element={<Requests />}></Route>

        </Route >

        <Route path='*' element={<ErrorPage />}></Route>
      </Routes >

      <Toaster position='top-right'></Toaster>
    </>
  )
}

export default App