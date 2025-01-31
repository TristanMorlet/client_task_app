import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { formatDate } from '../functions/formateDate'
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTask } from '../state/tasks/taskSlice';
export default function MoreInfoButton( {task} ) {
  
    const [infoOpen, setInfoOpen] = useState(false);
    const [newAssignedTo, setNewAssignedTo] = useState(task.assignedTo);
    const [newDeadline, setNewDeadline] = useState(task.deadline);
    const [newTags, setNewTags] = useState(task.tags);
    const [newStatus, setNewStatus] = useState(task.status);

    const dispatch = useDispatch();
    const staffList = ["None", "Staff 1", "Staff 2", "Staff 3"];
    const availableTags = ["Tag 1", "Tag 2", "Tag 3"];


    const prevAssignedTo = useRef(task.assignedTo);
    const prevDeadline = useRef(task.deadline);
    const prevTags = useRef(task.tags);
    const prevStatus = useRef(task.status);

    useEffect(() => {
        if (prevAssignedTo.current !== newAssignedTo) {
          dispatch(updateTask({ ...task, assignedTo: newAssignedTo }));
          prevAssignedTo.current = newAssignedTo;
        }
      }, [newAssignedTo, dispatch, task]);
    
      useEffect(() => {
        if (prevDeadline.current !== newDeadline) {
          dispatch(updateTask({ ...task, deadline: newDeadline }));
          prevDeadline.current = newDeadline;
        }
      }, [newDeadline, dispatch, task]);
    
      useEffect(() => {
        if (prevTags.current !== newTags) {
          dispatch(updateTask({ ...task, tags: newTags }));
          prevTags.current = newTags;
        }
      }, [newTags, dispatch, task]);
    
      useEffect(() => {
        if (prevStatus.current !== newStatus) {
          dispatch(updateTask({ ...task, status: newStatus }));
          prevStatus.current = newStatus;
        }
      }, [newStatus, dispatch, task]);

    function handleButtonClick() {
        setInfoOpen(!infoOpen);
    }

    function handleDelete() {
        dispatch(deleteTask(task.id));
    }

    function handleTagChange(tag) {
        const updatedTags = newTags.includes(tag) ? newTags.filter(tag2 => tag2 !== tag)  : [...newTags, tag];
        setNewTags(updatedTags);
        dispatch(updateTask({...task, tags: updatedTags}));

    }
  
    return (
    <div className="relative h-fit">
        <button 
          className="font-bold text-lg mb-1"
          onClick={handleButtonClick}>
            ...
        </button>

        {infoOpen && (
            <div className="transition-all duration-300 ease-in-out overflow-hidden">
                <div className="p-3 mt-2 bg-gray-50 border border-gray-300 rounded-md shadow-md text-sm text-gray-700 space-y-4">
                    <div className="flex justify-between items-center">
                        <h4 className="font-semi-bold">Reassign</h4>
                        <select 
                            value={newAssignedTo} 
                            onChange={(e) => setNewAssignedTo(e.target.value)}
                            className="p-1 border border-gray-300 rounded-md focus:border-gray-200"
                        >
                            {staffList.map(staff => (
                                <option key={staff} value={staff}>{staff}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <h4 className="font-semi-bold">Reschedule</h4>
                        <input 
                            type="text" 
                            value={newDeadline} 
                            onChange={(e) => setNewDeadline(e.target.value)} 
                            placeholder='DD/MM/YYYY'
                            className="w-full p-1 border border-gray-300 rounded-md focus:border-gray-200"
                        />
                    </div>

                    <div>
                        <h4 className="font-semi-bold">Tags</h4>
                        {availableTags.map(tag => (
                            <div key={tag} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={newTags.includes(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    className="cursor-pointer"
                                />
                                <label>{tag}</label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h4 className="font-semi-bold">Status</h4>
                        <select
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
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
    </div>
  )
}
