import React from 'react'

export default function Filter() {
  
  
  
  
  
  
  
  
    return (
    <div className="flex items-center">
        <span className="mr-2">Filter by:</span>
        <select className="border border-gray-300 rounded px-2 py-1">
            <option>None</option>
            <option>Assigned to:</option>
            <option>Date Added</option>
            <option>Tags</option>
            <option>Overdue</option>
        </select>
    </div>
  )
}
