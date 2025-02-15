'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../state/users/authSlice'
import { useRouter } from 'next/navigation' 
import { useState } from 'react'

export default function LoginPage() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [role, setRole] = useState(null)
    const [email, setEmail] = useState("")
    const [showWarning, setShowWarning] = useState(false)
    const registeredUsers = useSelector((state) => state.user)


    function handleLogin() {
        const user = registeredUsers.find((u) => u.useremail === email && u.role === role)

        if (user) {
            dispatch(login(user));
            router.push("/dashboard/alltasks")
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
