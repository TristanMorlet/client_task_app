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
                
                const staffTasks = member.taskList;
                const staffFinishedTasks = member.completeList
                const allTasks = staffTasks.concat(staffFinishedTasks)
                for (const taskId of allTasks) {
                    const task = tasks.find(t => t.id === taskId)
                    if (!task) continue;
                    dispatch(updateTask({taskId: taskId, property: "assignedTo", value: "None"}))
                    
                    const taskResponse = await fetch(`/api/taskAPIs/${taskId}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ assignedTo: "None" })
                    })
                    if (!taskResponse.ok) {
                        console.error("failed to unassign task from deleted staff")
                    }
                }
                
                const res = await fetch(`/api/staffAPIs/${member.id}`, {
                    method: "DELETE"
                })
                console.log(res)
                if (!res.ok) {
                    throw new Error("Failed to delete Staff")
                } 

                const res2 = await fetch(`/api/userAPIs/${member.id}`, {
                    method: "DELETE"
                })
                if (!res2.ok) {
                    throw new Error("failed to delete User")
                }


                console.log("Staff and user deleted")
            } catch (err) {
                console.error("Error deleting Staff", err)
            }
            dispatch(deleteStaff(member.id))
            /* dispatch(removeUser(member.id)) */

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
