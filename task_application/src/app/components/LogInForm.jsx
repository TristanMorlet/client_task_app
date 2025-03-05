'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../state/users/authSlice'
import { useRouter } from 'next/navigation' 
import { useState, useEffect } from 'react'
import { loginUser } from '../utils/authHelper'
import { checkAuth } from '../state/users/authSlice'
import { setStaff } from '../state/staff/staffSlice'
import { setUsers } from '../state/users/userSlice'

export default function LogInForm() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState("")
    const [showWarning, setShowWarning] = useState(false)
    const registeredUsers = useSelector((state) => state.user)

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
                                   
    async function handleLogin() {
        const user = registeredUsers.find((u) => u.useremail === email && u.role === role)

        if (user) {
            try {
                const { token } = await loginUser(email, role)
                dispatch(login({ email: user.useremail, role: user.role, id: user.id, token }));
                router.push("/dashboard/alltasks")
            } catch (error) {
                console.error("route error", error)
                setShowWarning(true)
            }
        } else {
            setShowWarning(true)
            return;
        }
    }
  
  
    return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="p-12 rounded-lg shadow-md  text-center border w-2/5">
            <h1 className="font-2xl font-bold mb-2"> Task Application
            </h1>
            <p className="text-gray-500 mb-4"> Who is logging in?</p>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                    className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                    onClick={() => setRole("staff")}
                >
                    Staff
                </button>

                <button
                    className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-400"
                    onClick={() => setRole("worklead")}
                >
                    Work-Lead
                </button>
            </div>


            {role && (
                <>
                    <input
                        type="email"
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4"
                    />
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-400 text-white px-4 py-4 rounded-md"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    {showWarning && (
                        <p className="text-red-500 mt-2"> Invalid Email </p>
                    )}
                </>
            )}
        </div>

    </div>
  )
}
