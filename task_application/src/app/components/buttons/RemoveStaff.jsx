'use client'
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStaff } from '@/app/state/staff/staffSlice'

export default function RemoveStaff( {member} ) {
    
    const [formOpen, setFormOpen] = useState(false)
    const dispatch = useDispatch()
    function togglePopUp() {
        setFormOpen(!formOpen)
    }

    function handleDeleteStaff() {
        console.log("Deleting Staff", member)
        dispatch(deleteStaff(member.name))
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
