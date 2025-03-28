'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask} from '../../state/tasks/taskSlice';
import { assignTask } from '@/app/state/staff/staffSlice';



export default function PopUpForm({ status }) {
    const [formOpen, setFormOpen] = useState(false);
    const [taskName, setTaskName] = useState("")
    const [assignedTo, setAssignedTo] = useState(undefined)
    const [deadline, setDeadline] = useState("")
    const [tags, setTags] = useState([])
    const [showWarning, setShowWarning] = useState(false)
    const dispatch = useDispatch();
    const availableTags = useSelector((state) => state.tags.tags)
    const staff = useSelector((state) => state.staff)
    console.log("Staff available to PopUp Form", staff)
    function togglePopUp() {
        setFormOpen(!formOpen)
        if (!formOpen) {
            setTaskName("");
            setAssignedTo(null);
            setDeadline("");
            setTags([]);
          }
        if (showWarning) {
            setShowWarning(!showWarning)
        }
          
    }


    async function handleSubmit(e) {
        e.preventDefault();
        
        if (!taskName.trim() || !deadline.trim() || assignedTo === null) {
            setShowWarning(true);
            return;
        }

        const newTask = {
            name: taskName,
            assignedTo,
            deadline,
            tags: tags.map(tag => tag.id),
            status,
            overdue: (new Date(deadline) <= new Date().toLocaleDateString('en-GB')),
        }


        try {
            const response = await fetch('/api/taskAPIs/createTask', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask)
            });

            const dbTask = await response.json()
            
            console.log("New Task created in DB", dbTask)

            console.log("Assigned to of new task", dbTask.assignedTo)
            console.log(dbTask.deadline)

            dispatch(addTask(dbTask))
            togglePopUp()

        } catch (error) {
            console.error("Error creating task in db", error)
        }

    }
    
    return (
        <div>
            <button 
                className="w-full mt-2 mx-2 bg-gray-300 px-2 py-1 rounded hover:bg-gray-200"
                onClick={(togglePopUp)}>
                    +
            </button>


            {formOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                    <div className="bg-white p-6 rounded-lg  w-3/5 md:w-1/5 shadow-lg">
                        <h2 className="text-xl font-bold mb-5 text-center"> New Task </h2>

                        <form>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Task Name:</label>
                                <input
                                    type="text-area"
                                    id="name"
                                    placeholder="Enter task name"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focuss:ring focus:border-gray-200" 
                                />
                            </div>

                            <div className="mb-4 flex items-center justify-between"> 
                                <label htmlFor="assign" className="mb-4 text-gray-700 font-medium">Assign To:</label>
                                <select 
                                    className="mb-4 border border-gray-300 rounded px-3 py-2 w-2/3 focus:border-gray-200"
                                    value={assignedTo || undefined}
                                    onChange={(e) => setAssignedTo(e.target.value ? Number(e.target.value) : undefined)}>
                                        <option
                                        value={undefined}
                                        >
                                            None
                                        </option>
                                    {staff.map((staffMember) => (
                                        <option 
                                            key={staffMember.id} 
                                            value={staffMember.id}
                                        >
                                                {staffMember.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="deadline" className="block mb-1 text-gray-700 font-medium">Deadline:</label>
                                <input
                                    type="text"
                                    id="deadline"
                                    placeholder="DD/MM/YYYY"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-gray-200"
                                />
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <label htmlFor="tags" className="mb-4 text-gray-700 font-medium">Tags:</label>
                                <div className="mb-4 border border-gray-300 rounded px-3 py-2 w-2/3 focus:border-gray-200">
                                    {availableTags.map((tag) => (
                                        <div key={tag.id} className="flex items-center mb-2">
                                            <input
                                                type="checkbox"
                                                id={tag}
                                                value={tag}
                                                checked={tags.some(t=> t.id === tag.id)}
                                                onChange={(e) => {
                                                    setTags((prevTags) => {
                                                        if (e.target.checked) {
                                                        return ([...prevTags, tag]);
                                                    } else {
                                                        return (prevTags.filter(t => t.id !== tag.id));
                                                    }
                                                })
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor={tag.id} className="text-gray-700">{tag.tagName}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-2 flex justify-center space-x-3 mt-6">
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
                            {showWarning && (
                                    <p className="text-center text-red-500 mt-2"> Invalid Name, Assignment, or Deadline </p>
                                )}
                        </form>
                    </div>
                </div>

            )}


        </div>
    )
}