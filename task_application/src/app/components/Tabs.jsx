import React from 'react'

export default function Tabs() {
  return (
    <div className="p-3 bg-gray-100 flex items-center justify-between">
        <h2 className="px-5 mr-4 font-bold text-lg">Task Application</h2>
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 text-gray-700 font-medium"> 
            <span className="p-1 my-1 cursor-pointer hover:text-blue-500 ease-in-out">All Tasks</span> 
            <span className="p-1 m-1 cursor-pointer hover:text-blue-500 ease-in-out">Staff</span>
            <span className="p-1 m-1 cursor-pointer hover:text-blue-500 ease-in-out">Metrics</span>
        </nav>

        <div className="mr-4">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded px-2 py-1 mr-2"
            />
        </div>



    </div>
  )
}
