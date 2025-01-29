import React from 'react'

export default function Tabs() {
  return (
    <div className="p-3 bg-gray-100 flex items-center">
        <h2 className="mr-4 font-bold text-lg">Task Application</h2>
        <nav className="flex space-x-4"> 
            <span className="p-1 m-1 cursor-pointer">All Tasks</span> 
            <span className="p-1 m-1 cursor-pointer">Staff</span>
            <span className="p-1 m-1 cursor-pointer">Metrics</span>
        </nav>

        <div className="ml-auto flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
        </div>



    </div>
  )
}
