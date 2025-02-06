import React from 'react'
import { useSelector } from 'react-redux'
import RemoveStaff from './RemoveStaff'
export default function StaffList() {
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks)
    console.log(staff)
  
  
  
  
  
    return (
    <div className="flex-row space-y-4 py-4 px-9">
        {staff.map((member, index) => (
            <div key={index}>
                <h1 className="text-bold text-xl"> {member.name} </h1>
                <div className="flex justify-between items-center text-gray-500">
                    <div className="px-4 py-1">
                        <p>Date Added: {new Date(member.dateAdded).toLocaleDateString()}</p>
                        <p>Email: {member.email}</p>
                    </div>
                        <RemoveStaff/>
                </div>           
            </div>
        ))}
    </div>
  )
}
