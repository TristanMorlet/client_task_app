'use client'
import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addStaff } from '@/app/state/staff/staffSlice'
import { addUser } from '@/app/state/users/userSlice'

export default function AddStaff() {
  
  const dispatch = useDispatch()
  const [formOpen, setFormOpen] = useState(false)

  const [staffName, setStaffName]= useState("")
  const [staffEmail, setStaffEmail] = useState("")

  function togglePopUp() {
    setFormOpen(!formOpen);
    if (!formOpen) {
      setStaffName("")
      setStaffEmail("")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();


    if (!staffName.trim() || !staffEmail.trim()) return;
    
    const createdUser = {
      useremail: staffEmail,
      role: "staff",
    }


    try {
        const userResponse = await fetch('/api/userAPIs/createUser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createdUser)
        });

        const dbUser = await userResponse.json()
        
        console.log("New User created in DB", dbUser)

        const newStaff = {
          name: staffName,
          role: "staff",
          dateAdded: Date.now(),
          email: staffEmail,
          tasksAssigned: 0,
          tasksCompleted: 0,
          taskList: [],
          completeList: [],
          userId: dbUser.id,
        }

        const staffResponse = await fetch('/api/staffAPIs/createStaff', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newStaff)
        })


        const dbStaff = await staffResponse.json()
        console.log("New Staff created in DB", dbStaff)
        dispatch(addStaff(dbStaff))
        dispatch(addUser(dbUser))

        togglePopUp()

    } catch (error) {
        console.error("Error creating staff/user in db", error)
    }
  }
  
  
  
  
  return (
    <div>
      <div>
        <button 
          onClick={togglePopUp}
          className="text-white rounded-md px-4 py-2 bg-blue-500 text-center text-bold hover:bg-blue-300 transition">
            Add Staff Member
        </button>
      </div>

      {formOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/5 shadow-lg">
              <h2 className="text-xl font-bold mb-5 text-center"> New Staff </h2>

              <form>

              <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Staff Name:</label>
                  <input
                      type="text-area"
                      id="name"
                      placeholder="Enter staff name"
                      value={staffName}
                      onChange={(e) => setStaffName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focuss:ring focus:border-gray-200" 
                  />
              </div>

              <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Staff Email:</label>
                  <input
                      type="text-area"
                      id="name"
                      placeholder="Enter staff email"
                      value={staffEmail}
                      onChange={(e) => setStaffEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focuss:ring focus:border-gray-200" 
                  />
              </div>

              <div className="p-2 flex justify-end space-x-3 mt-6">
                  <button
                      onClick={handleSubmit}
                      className="text-white rounded-md px-4 py-2 bg-blue-500 text-center text-bold hover:bg-blue-300 transition"
                  >
                      Add
                  </button>
                  <button
                      onClick={togglePopUp}
                      className="text-white rounded-md px-4 py-2 bg-gray-300 text-center text-bold hover:bg-gray-200 transition"
                  >
                      Cancel 
                  </button>
              </div>
            </form>
        </div>
        </div>
      )}
    </div>
  )
}
