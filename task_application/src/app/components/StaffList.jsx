'use client'

import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RemoveStaff from './Buttons/RemoveStaff'
import ProgressBar from './ProgressBar'
import {setStaff} from '../state/staff/staffSlice'
import { setUsers } from '../state/users/userSlice'

export default function StaffList( {page, searchText, dateRange, user} ) {
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks.tasks)
    const dispatch = useDispatch()
    console.log("Staff List available to staffList", staff)

    useEffect(() => {
        async function fetchUsers() {
        try {
            const res = await fetch("/api/userAPIs/getUsers");
            const data = await res.json()
            console.log("Users retrieved", data)
            dispatch(setUsers(data))
        } catch (err) {
            console.error("Failed to Fetch Users", err)
        }
        }
        fetchUsers();
    }, [dispatch])

    useEffect(() => {
          async function fetchStaff() {
            try {
                const res = await fetch("/api/staffAPIs/getStaff");
                const data = await res.json()
                console.log("Staff retrieved", data)
                dispatch(setStaff(data))
            } catch (err) {
                console.error("Failed to Fetch Staff", err)
            }
          }
          fetchStaff();
      }, [dispatch])

    
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
        {processedStaff.map((member) => (
            <div key={member.id}>
                
                <h1 className="text-bold text-sm md:text-2xl"> {member.name} </h1>
                <div className="flex justify-between items-center text-gray-500">
                {page === 'staff' && (
                    <>
                    <div className="px-4 py-1 text-xs md:text-lg">
                        <p>Date Added: {new Date(member.dateAdded).toLocaleDateString("en-GB")}</p>
                        <p>Email: {member.email}</p>
                    </div>
                        <RemoveStaff key={member.id} member={member} />
                    </>
                        )} 
                {page === 'metrics' && (
                    <>
                    <div className="px-4 py-1 text-xs md:text-lg">
                        <p>Tasks Assigned: {member.tasksAssigned}</p>
                        <p>Tasks Completed: {member.tasksCompleted}</p>
                    </div>
                    <div className="px-4 py-1">
                        <ProgressBar page="metrics" member={member} user={user} />
                    </div>
                    
                    </>
                )} 
                </div>
            </div>
        ))}
    </div>
  )
}
