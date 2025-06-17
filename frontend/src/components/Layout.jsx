import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
        <Navbar />

        <div className='container mx-auto min-h-[80vh] p-4' >
                    <Outlet />
        </div>

        <Footer />
    </div>
  )
}
