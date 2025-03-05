'use client'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStaff } from '@/app/state/staff/staffSlice'
import { removeUser } from '@/app/state/users/userSlice'

export default function RemoveStaff( {member} ) {
    
    const [formOpen, setFormOpen] = useState(false)
    const dispatch = useDispatch()
    function togglePopUp() {
        setFormOpen(!formOpen)
    }

    function handleDeleteStaff() {
        console.log("Deleting Staff", member)

        async function deleteDBStaff(id) {
            try { 
                const res = await fetch(`/api/staffAPIs/${id}`, {
                    method: "DELETE"
                })
                console.log(res)
                if (!res.ok) {
                    throw new Error("Failed to delete Staff")
                }

                const res2 = await fetch(`/api/userAPIs/${id}`, {
                    method: "DELETE"
                })
                if (!res2.ok) {
                    throw new Error("failed to delete User")
                }

                console.log("Staff and user deleted")
            } catch (err) {
                console.error("Error deleting Staff", err)
            }
        }
        deleteDBStaff(member.id)
        dispatch(deleteStaff(member.name))
        /* dispatch(removeUser(member)) */
    }
    
    
    
    return (
        <div>
            <div>
                <button 
                onClick={handleDeleteStaff}
                className="text-white rounded-md px-4 py-2 bg-red-500 text-center text-bold hover:bg-red-300 transition text-sm">
                    Remove Staff Member
                </button>
            </div>


        </div>
    )
}
