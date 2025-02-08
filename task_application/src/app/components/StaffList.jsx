'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import RemoveStaff from './Buttons/RemoveStaff'
import ProgressBar from 'react-bootstrap/ProgressBar'
export default function StaffList( {page} ) {
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks)
    console.log(staff)
  
    
    
  
  
    return (
    <div className="flex-row space-y-4 py-4 px-9">
        {staff.filter(member => member.name !== "None").map((member, index) => (
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
                        <label htmlFor='progressbar' className="text-sm">
                        Completion Rate: {member.tasksAssigned > 0 ? Math.round((member.tasksCompleted / member.tasksAssigned) * 100) : 0}%
                        </label>
                        <progress 
                        id="progressbar"
                        value={member.tasksAssigned > 0 ? ((member.tasksCompleted / member.tasksAssigned) * 100) : 0}
                        max="100"
                        className="w-full h-2 rounded-md bg-gray-200 
                        [&::-webkit-progress-bar]:bg-gray-200 
                        [&::-webkit-progress-value]:bg-green-500"
                        />
                    </div>
                    
                    </>
                )} 
                </div>
            </div>
        ))}
    </div>
  )
}
