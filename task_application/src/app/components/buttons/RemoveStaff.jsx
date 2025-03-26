'use client'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStaff } from '@/app/state/staff/staffSlice'
import { updateTask } from '@/app/state/tasks/taskSlice'
import { removeUser } from '@/app/state/users/userSlice'

export default function RemoveStaff( {member} ) {
    const tasks = useSelector(state => state.tasks.tasks)
    const [formOpen, setFormOpen] = useState(false)
    const dispatch = useDispatch()
    function togglePopUp() {
        setFormOpen(!formOpen)
    }

    async function handleDeleteStaff() {
        console.log("Deleting Staff", member)
            try {
                const tasksResponse = await fetch("/api/taskAPIs/getTasks")
                if (!tasksResponse.ok) throw new Error("Failed to fetch tasks")
                const allTasks = await tasksResponse.json()

                const staffTasks = allTasks.filter(task => task.assignedTo === member.id)

                for (const task of staffTasks) {
                    dispatch(updateTask({taskId: task.id, property: "assignedTo", value: null}))

                    const taskResponse2 = await fetch(`/api/taskAPIs/${task.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json"},
                        body: JSON.stringify({assignedTo: null})
                    })

                    if (!taskResponse2.ok) {
                        console.error(`Failed to unassign task with ID: ${task.id}`)
                    }
                }

                const staffResponse = await fetch(`/api/staffAPIs/${member.id}`, {method: "DELETE"});

                if (!staffResponse.ok) throw new Error("failed to delete Staff")

                const userResponse = await fetch(`/api/userAPIs/${member.userId}`, {method: "DELETE"})
                if (!userResponse.ok) throw new Error("Failed to delete user account")

                console.log("Staff and User deleted")
                dispatch(deleteStaff(member.id))
            } catch (error) {
                console.error("Error deleting staff")
            }
        }

    
    
    
    return (
        <div>
            <div>
                <button 
                onClick={handleDeleteStaff}
                className="text-white rounded-md px-4 py-2 bg-red-500 text-center text-bold hover:bg-red-300 transition text-xs md:text-sm">
                    Remove Staff Member
                </button>
            </div>
 

        </div>
    )
}
