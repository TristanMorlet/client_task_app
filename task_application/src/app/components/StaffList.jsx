'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import RemoveStaff from './Buttons/RemoveStaff'
import ProgressBar from './ProgressBar'
export default function StaffList( {page, searchText} ) {
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks)
    console.log(staff)

    const filterStaff = staff.filter((staff) => {
        const matchesSearchText = staff.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearchText;
    })
  
    
    
  
  
    return (
    <div className="flex-row space-y-4 py-4 px-9">
        {filterStaff.filter(member => member.name !== "None").map((member, index) => (
            <div key={index}>
                
                <h1 className="text-bold text-xl"> {member.name} </h1>
                <div className="flex justify-between items-center text-gray-500">
                {page === 'staff' && (
                    <>
                    <div className="px-4 py-1">
                        <p>Date Added: {new Date(member.dateAdded).toLocaleDateString()}</p>
                        <p>Email: {member.email}</p>
                    </div>
                        <RemoveStaff key={index} member={member} />
                    </>
                        )} 
                {page === 'metrics' && (
                    <>
                    <div className="px-4 py-1">
                        <p>Tasks Assigned: {member.tasksAssigned}</p>
                        <p>Tasks Completed: {member.tasksCompleted}</p>
                    </div>
                    <div className="px-4 py-1">
                        <ProgressBar page="metrics" member={member}/>
                    </div>
                    
                    </>
                )} 
                </div>
            </div>
        ))}
    </div>
  )
}
