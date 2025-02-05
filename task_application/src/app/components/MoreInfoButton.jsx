
import React from 'react'
import { formatDate } from '../functions/formateDate'
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskProperty, deleteTask } from '../state/tasks/taskSlice';
export default function MoreInfoButton( {task} ) {
  
    const dispatch = useDispatch();
    const staffList = ["None", "Staff 1", "Staff 2", "Staff 3"];
    const availableTags = useSelector((state) => state.tags)


    function handlePropertyChange(property, newValue) {
        dispatch(updateTaskProperty({taskId: task.id, property, value: newValue}))
    }
    function handleDelete() {
        dispatch(deleteTask(task.id));
    }

    function handleTagChange(tag) {
        const updatedTags = newTags.includes(tag) ? newTags.filter(tag2 => tag2 !== tag)  : [...newTags, tag];
        setNewTags(updatedTags);
        dispatch(updateTaskProperty({...task, tags: updatedTags}));

    }
  
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
                            {staffList.map(staff => (
                                <option key={staff} value={staff}>{staff}</option>
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
                                    checked={task.tags.includes(tag)}
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
