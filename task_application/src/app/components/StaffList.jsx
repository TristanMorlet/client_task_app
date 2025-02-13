'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import RemoveStaff from './Buttons/RemoveStaff'
import ProgressBar from './ProgressBar'
export default function StaffList( {page, searchText, dateRange} ) {
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks.tasks)
    console.log("Staff List available to staffList", staff)

    const filterStaff = staff.filter((staff) => {
        const matchesSearchText = staff.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearchText
    })
    console.log("Filtered Staff List", filterStaff)

    const processedStaff = filterStaff.map(member => {
        const [startDate, endDate] = dateRange && dateRange.length === 2 
            ? dateRange.map(date => new Date(date).getTime())
            : [null, null];
        
        const filterTasksByDate = (taskList) => taskList.filter(taskId => {
            const task = tasks.find(t => t.id === taskId)
            if (!task) return false;
            const taskDate = new Date(task.id).getTime()
            return startDate && endDate ? taskDate >= startDate && taskDate <= endDate: true;
        }) 

        const filteredTaskList = filterTasksByDate(member.taskList)
        const filteredCompleteList = filterTasksByDate(member.completeList)

        return {
            ...member,
            taskList: filteredTaskList,
            completeList: filteredCompleteList,
            tasksAssigned: filteredTaskList.length + filteredCompleteList.length,
            tasksCompleted: filteredCompleteList.length
        }
    })
    
    console.log("Processed Staff List with Date Filter:", processedStaff)
    
    
  
  
    return (
    <div className="flex-row space-y-4 py-4 px-9">
        {processedStaff.filter(member => member.name !== "None").map((member, index) => (
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
