'use client'

import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import RemoveStaff from './buttons/RemoveStaff'
import ProgressBar from './ProgressBar'
import {setStaff} from '../state/staff/staffSlice'
import { setUsers } from '../state/users/userSlice'

export default function StaffList( {page, searchText, dateRange, user} ) {
    const staff = useSelector((state) => state.staff)
    const tasks = useSelector((state) => state.tasks.tasks)
    const dispatch = useDispatch()
    console.log("Staff List available to staffList", staff)

    const [staffWithTaskCounts, setStaffWithTaskCounts] = useState([])

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

      useEffect(() => {
        const updatedStaff = staff.map(member => {
            const assignedTasks = tasks.filter(task => task.assignedTo === member.id)
            const completedTasks = assignedTasks.filter(task => task.status === "Finished")

            if (dateRange && dateRange.length === 2) {
                const [startDate, endDate] = dateRange.map(date => new Date(date).getTime())

                const filterTasksByDate = taskList => taskList.filter(task => {
                    const taskDate = new Date(task.createdAt).getTime()
                    return taskDate >= startDate && taskDate <= endDate
                })

                return {
                    ...member,
                    tasksAssigned: filterTasksByDate(assignedTasks).length,
                    tasksCompleted: filterTasksByDate(completedTasks).length,
                }
            }

            return {
                ...member,
                tasksAssigned: assignedTasks.length,
                tasksCompleted: completedTasks.length,
            }
        })

        setStaffWithTaskCounts([...updatedStaff])
        console.log(staffWithTaskCounts)
    }, [tasks, staff, dateRange])
    console.log(staffWithTaskCounts)
    const filterStaff = staffWithTaskCounts.filter((staff) => {
        const matchesSearchText = staff.name.toLowerCase().includes(searchText.toLowerCase());
        return matchesSearchText
    })
    console.log("Filtered Staff List", filterStaff)

    
  
  
    return (
    <div className="flex-row space-y-4 py-4 px-9">
        {filterStaff.map((member) => (
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
