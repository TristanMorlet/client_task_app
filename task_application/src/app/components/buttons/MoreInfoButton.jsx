
import React, {useState, useEffect} from 'react'
import { formatDate } from '../../utils/formateDate'
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask, setTasks } from '../../state/tasks/taskSlice';
import { assignTask, unassignTask, completeTask, uncompleteTask } from '@/app/state/staff/staffSlice';

export default function MoreInfoButton( {task, role} ) {
  
    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff)
    const availableTags = useSelector((state) => state.tags.tags)
    const [newTags, setNewTags] = useState(task.tags || []);

    console.log(newTags)
    console.log(availableTags)
    console.log(task.assignedTo)

    useEffect(() => {
        setNewTags(task.tags || []);
    }, [task.tags]);

    async function fetchTasksAndUpdateStore() {
        try {
            const response = await fetch("/api/taskAPIs/getTasks");
            const tasks = await response.json();
            dispatch(setTasks(tasks)); 
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    async function handlePropertyChange(property, newValue) {

        console.log(`Updating ${property} to ${newValue}`)
        try {
            const taskResponse = await fetch(`/api/taskAPIs/${task.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ [property]: newValue }),
            });
      
            if (!taskResponse.ok) {
              throw new Error(`Failed to update ${property}`);
            }
      
            dispatch(updateTask({ taskId: task.id, property, value: newValue }));
      
            if (property === "assignedTo") {
              fetchTasksAndUpdateStore()
            }
      
            
            if (property === "status" && newValue === "Finished") {
              const overdueResponse = await fetch(`/api/taskAPIs/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ overdue: false }),
              });
      
              if (!overdueResponse.ok) {
                throw new Error("Failed to update overdue status");
              }
      
              dispatch(updateTask({ taskId: task.id, property: "overdue", value: false }));
            }
       
        } catch (err) {

            console.error("Error updating task property in DB", err)

        }
    }
    async function handleDelete() {
        try { 
                const res = await fetch(`/api/taskAPIs/${task.id}`, {
                    method: "DELETE"
                })
                console.log(res)
                if (!res.ok) {
                    throw new Error("Failed to delete Task")
                }

                dispatch(deleteTask(task.id))
                fetchTasksAndUpdateStore()
                console.log("Task deleted")
            } catch (err) {
                console.error("Error deleting task", err)
            }

        }
    

    async function handleTagChange(tag) {
        
        const updatedTags = newTags.some(t => t.id === tag.id) 
            ? newTags.filter(t => t.id !== tag.id)
            : [...newTags, tag];

        setNewTags(updatedTags)
        

        try {
            const response = await fetch(`/api/taskAPIs/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tags: updatedTags }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task tags");
            }

            
            dispatch(updateTask({ taskId: task.id, property: "tags", value: updatedTags }));

        } catch (err) {
            console.error("Error updating task tags in DB", err);
        }
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
                                value={task.assignedTo === null ? undefined : task.assignedTo} 
                                onChange={(e) => handlePropertyChange("assignedTo", e.target.value)}
                                className="p-1 border border-gray-300 rounded-md focus:border-gray-200"
                            >
                                {task.assignedTo === null && (
                                    <option value={undefined}> None </option>
                                )}
                                {staff.map(staff => (
                                    <option key={staff.id} value={staff.id}>{staff.name}</option>
                                ))}
                            </select>
                            </>
                        )}
                        {role === "staff" && (
                            <>
                            <h4 className="font-semibold">Assigned To</h4>
                            {task.assignedTo === "" && (
                                <p className="px-4 py-1 border border-gray-300 rounded-md focus:border-gray-200"> None </p>
                            )}
                            <p className="px-2 py-1 m-1 border border-gray-300 rounded-md focus:border-gray-200"> {staffMember.name} </p>
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
