
import React, {useState} from 'react'
import { formatDate } from '../../utils/formateDate'
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../../state/tasks/taskSlice';
import { assignTask, unassignTask, completeTask } from '@/app/state/staff/staffSlice';
export default function MoreInfoButton( {task} ) {
  
    const dispatch = useDispatch();
    const staff = useSelector((state) => state.staff)
    const availableTags = useSelector((state) => state.tags)
    const [newTags, setNewTags] = useState(task.tags || []);



    function handlePropertyChange(property, newValue) {
        if (property === "assignedTo" && task.assignedTo !== newValue){
            if (task.assignedTo !== "None") {
                dispatch(unassignTask({ staffName: task.assignedTo, taskId: task.id }))
            }
            if (newValue !== "None") {
                dispatch(assignTask({ staffName: newValue, taskId: task.id }))
            }
        }
        if (property === "status" && newValue === "Finished" && task.status !== "Finished"){
            dispatch(completeTask({ staffName: task.assignedTo, taskId: task.id }))
        }
    
        
        dispatch(updateTask({taskId: task.id, property, value: newValue}))
    }
    function handleDelete() {
        dispatch(deleteTask(task.id))
        
        if (task.assignedTo !== "None") {
            dispatch(unassignTask({staffName: task.assignedTo, taskId: task.id }))
        };
    }

    function handleTagChange(tag) {
        setNewTags((prevTags) => {
            const updatedTags = prevTags.includes(tag) 
            ? prevTags.filter(t => t !== tag)
            : [...prevTags, tag]

            dispatch(updateTask({taskId: task.id, property: "tags", value: updatedTags}));

            return updatedTags
        })
    };
    
  
    return (
            <div className="transition-all duration-300 ease-in-out overflow-hidden">
                <div className="p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-md text-sm text-gray-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Reassign</h4>
                        <select 
                            value={task.assignedTo} 
                            onChange={(e) => handlePropertyChange("assignedTo", e.target.value)}
                            className="p-1 border border-gray-300 rounded-md focus:border-gray-200"
                        >
                            {staff.map(staff => (
                                <option key={staff.dateAdded} value={staff.name}>{staff.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h4 className="font-semibold">Reschedule</h4>
                        <input 
                            type="text" 
                            value={task.deadline} 
                            onChange={(e) => handlePropertyChange("deadline", e.target.value)} 
                            placeholder='DD/MM/YYYY'
                            className="w-full p-1 border border-gray-300 rounded-md focus:border-gray-200"
                        />
                    </div>

                    <div>
                        <h4 className="font-semibold">Tags</h4>
                        {availableTags.map(tag => (
                            <div key={tag} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={tag}
                                    checked={newTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    className="cursor-pointer"
                                />
                                <label>{tag}</label>
                            </div>
                        ))}
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

                    <div className="text-right">
                        <button className="text-red-500 hover:text-red-700 font-semibold" onClick={handleDelete}>
                            Delete 
                        </button>
                    </div>
            </div>
        </div>
)}
