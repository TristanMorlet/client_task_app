'use client'
import React from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar'
import ProfileDropdown from './ProfileDropdown'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
export default function Tabs( {setSearch, role} ) {
  
  
  const [currentPage, setCurrentPage] = useState('/dashboard/alltasks')
  
  useEffect(() => {
    setCurrentPage(window.location.pathname)
  }, [])

  function handleChange(e) {
    const newPage = e.target.value
    setCurrentPage(newPage) 
    window.location.href = newPage 
  }

  return (
    <div className="p-3 bg-gray-100 flex items-center justify-between">
        <h2 className="px-5 mr-4 font-bold text-sm md:text-lg">Task Application</h2>
        <nav className="hidden md:flex md:flex-row md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex space-x-4 text-gray-700 font-medium md:font-small"> 
          <Link href="/dashboard/alltasks" className="p-1 my-1 cursor-pointer hover:text-blue-500 ease-in-out">
          All Tasks
          </Link>
          

          {role === "worklead" && (
          <>
            <Link href="/dashboard/staff" className="p-1 my-1 cursor-pointer hover:text-blue-500 ease-in-out"> 
            Staff
            </Link>
            <Link href="/dashboard/metrics" className="p-1 my-1 cursor-pointer hover:text-blue-500 ease-in-out">
            Metrics 
            </Link>
          </>
        )}
          
        </nav>
        <div className="md:hidden">
          <select
          className="p-2 border border-gray-300 rounded-md"
          value={currentPage}
          onChange={handleChange}
        >
          <option value="/dashboard/alltasks">All Tasks</option>
          {role === "worklead" && (
            <>
              <option value="/dashboard/staff">Staff</option>
              <option value="/dashboard/metrics">Metrics</option>
            </>
          )}
          </select>
        </div>
        <div className="flex space-x-2 px-4 md:px-0">
          <ProfileDropdown onLogout={console.log("logging out")}/>
          <SearchBar setSearch={setSearch} />

        </div>
        



    </div>
  )
}
