
import React, {useState} from 'react'
import { formatDate } from '../../utils/formateDate'
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../../state/tasks/taskSlice';
import { assignTask, unassignTask, completeTask } from '@/app/state/staff/staffSlice';
export default function MoreInfoButton( {task, role} ) {
  
    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff)
    const availableTags = useSelector((state) => state.tags.tags)
    const [newTags, setNewTags] = useState(task.tags || []);

    console.log(newTags)
    console.log(availableTags)
    console.log(task.assignedTo)

    async function handlePropertyChange(property, newValue) {

        console.log(property)
        if (property === "assignedTo" && task.assignedTo !== newValue){
            if (task.assignedTo !== "1") {
                try{
                    const assignedStaff = staff.find(s => s.id == task.assignedTo)
                    const updatedTaskList = assignedStaff.taskList.filter(taskId => {
                        console.log(taskId, task.id)
                        return taskId !== task.id
                })
                    const completeList = assignedStaff.completeList

                    console.log(updatedTaskList)
                    const staffResponse = await fetch(`/api/staffAPIs/${task.assignedTo}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            taskList: updatedTaskList, 
                            tasksAssigned: updatedTaskList.length + completeList.length
                        })
                    })
                    console.log(staffResponse.json())
                    dispatch(unassignTask({ staffId: task.assignedTo, taskId: task.id }))
                } catch (err) {
                    console.error("Error unassigning task in DB", err)
                }
            } 
            if (newValue !== "1") {
                try{
                    console.log(newValue)
                    const assignedStaff = staff.find(s => s.id == newValue)
                    const updatedTaskList = [...assignedStaff.taskList, task.id]
                    const completeList = assignedStaff.completeList
                    const staffResponse = await fetch(`/api/staffAPIs/${newValue}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ 
                            taskList: updatedTaskList,
                            tasksAssigned: updatedTaskList.length + completeList.length

                        })
                    })
                    dispatch(assignTask({ staffId: newValue, taskId: task.id }))
                } catch (err) {
                    console.error("Error updating taskList in db", err)
                }
            }
        }
        if (property === "status" && newValue === "Finished" && task.status !== "Finished"){

            try {
                const assignedStaff = staff.find(s => s.id == task.assignedTo)
                const updatedCompleteList = [...assignedStaff.completeList, task.id]
                const updatedTaskList = assignedStaff.taskList.filter(taskId => taskId !== task.id)
                const staffResponse = await fetch(`/api/staffAPIs/${task.assignedTo}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        completeList: updatedCompleteList,
                        taskList: updatedTaskList,
                        tasksAssigned: updatedTaskList.length + updatedCompleteList.length,
                        tasksCompleted: updatedCompleteList.length
                    },)
                })
                dispatch(completeTask({ staffId: task.assignedTo, taskId: task.id }))

            } catch (err) {
                console.error("Error updating complete list in db")
            }
        }
    
        try {
            console.log(property)
            console.log(newValue)
            const taskResponse = await fetch(`/api/taskAPIs/${task.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ [property]: newValue })
            })

            dispatch(updateTask({taskId: task.id, property, value: newValue}))
        } catch (err) {
            console.error("Error updating task property in DB", err)
        }
    }
    async function handleDelete() {
        async function deleteDBTask(id) {
            try { 
                const res = await fetch(`/api/taskAPIs/${id}`, {
                    method: "DELETE"
                })
                console.log(res)
                if (!res.ok) {
                    throw new Error("Failed to delete Task")
                }

                console.log("Task deleted")
            } catch (err) {
                console.error("Error deleting task", err)
            }
        }
        deleteDBTask(task.id)

        dispatch(deleteTask(task.id))
        
        if (task.assignedTo !== "1") {
            try{
                const assignedStaff = staff.find(s => s.id == task.assignedTo)
                const updatedTaskList = assignedStaff.taskList.filter(taskId => taskId !== task.id)
                const staffResponse = await fetch(`/api/staffAPIs/${task.assignedTo}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ taskList: updatedTaskList })
                })
                dispatch(unassignTask({ staffId: task.assignedTo, taskId: task.id }))
            } catch (err) {
                console.error("Error unassigning task in DB", err)
            }
        };
    }

    function handleTagChange(tag) {
        
        const updatedTags = newTags.some(t => t.id === tag.id) 
            ? newTags.filter(t => t.id !== tag.id)
            : [...newTags, tag];

        setNewTags(updatedTags)
        dispatch(updateTask({taskId: task.id, property: "tags", value: updatedTags}));
    };

    const staffMember = staff.find((staff) => staff.id == task.assignedTo)
    
  
    return (
            <div className="transition-all duration-300 ease-in-out overflow-hidden">
                <div className="p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-md text-sm text-gray-700 space-y-4">
                    <div className="flex justify-between items-center">
                        {role === "worklead" && (
                            <>
                            <h4 className="font-semibold">Reassign</h4>
                            <select 
                                value={task.assignedTo} 
                                onChange={(e) => handlePropertyChange("assignedTo", e.target.value)}
                                className="p-1 border border-gray-300 rounded-md focus:border-gray-200"
                            >
                                {staff.map(staff => (
                                    <option key={staff.id} value={staff.id}>{staff.name}</option>
                                ))}
                            </select>
                            </>
                        )}
                        {role === "staff" && (
                            <>
                            <h4 className="font-semibold">Assigned To</h4>
                            <p className="px-4 py-1 border border-gray-300 rounded-md focus:border-gray-200"> {staffMember.name} </p>
                            </>
                        )}
                    </div>
                    

                    <div>
                        {role === "worklead" && (
                            <>
                            <h4 className="font-semibold">Reschedule</h4>
                            <input 
                                type="text" 
                                value={task.deadline} 
                                onChange={(e) => handlePropertyChange("deadline", e.target.value)} 
                                placeholder='DD/MM/YYYY'
                                className="w-full p-1 border border-gray-300 rounded-md focus:border-gray-200"
                            />
                            </>
                        )}
                        {role === "staff" && (
                            <>
                            <h4 className="font-semibold">Deadline</h4>
                            <p className="w-full p-1 border border-gray-300 rounded-md focus:border-gray-200"> {task.deadline} </p>
                            </>
                        )}
                    </div>

                    <div>
                        <h4 className="font-semibold">Tags</h4>
                        {role === "worklead" && (
                            <>
                            {availableTags.map(tag => (
                            <div key={tag.id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={tag.id}
                                    checked={newTags.some(t=> t.id === tag.id)}
                                    onChange={() => handleTagChange(tag)}
                                    className="cursor-pointer"
                                />
                                <label>{tag.tagName}</label>
                            </div>
                            ))}
                            </>
                        )}
                        {role === "staff" && (
                            <>
                            {newTags.map(tag => (
                                <div key={tag.id} className="flex items-center space-x-2">
                                    <p className="p-1">  {tag.tagName}</p>
                                </div>
                            ))}
                            </>
                        )}
                    </div>

                    <div>
                        <h4 className="font-semibold">Status</h4>
                        <select
                            value={task.status}
                            onChange={(e) => handlePropertyChange("status", e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded-md hover:border-gray-200 focus:border-gray-200"
                        >
                            <option value="To-Do">To Do</option>
                            <option value="Started">Started</option>
                            <option value="Finished">Finished</option>
                        </select>
                    </div>
                    {role === "worklead" && (
                        <div className="text-right">
                            <button className="text-red-500 hover:text-red-700 font-semibold" onClick={handleDelete}>
                                Delete 
                            </button>
                        </div>
                    )}
            </div>
        </div>
)}
