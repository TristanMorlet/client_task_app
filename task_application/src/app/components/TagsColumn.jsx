import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleListView } from '../state/tasks/tagListSlice';
import Task from './Task';
import { deleteTag } from '../state/tasks/tagSlice';
export default function TagsColumn({title, tasks}) {

    const dispatch = useDispatch();
    
    const tagsState = useSelector((state) => state.tagList.tagList)
    console.log(tagsState)
    
    function handleToggleListView() {
        dispatch(toggleListView(title))
    }

    function handleDeleteTag() {
        console.log(title)
        dispatch(deleteTag(tagsState, title))

    }
  
    return (
    <div className="p-4 flex flex-col bg-gray-50 rounded-lg border border-gray-300 h-fit">
        <h4 
            className="text-lg font-semibold p-3 border-b cursor-pointer flex justify-between items-center"
            onClick={handleToggleListView}>
                {title}
                <span>{tagsState[title] ? "▲" : "▼"}</span>
        </h4>
        <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                tagsState[title] ? 'max-h-screen overflow-y-auto' : 'max-h-0'
                }`}
        >
            {tasks.length > 0 ? (
                tasks.map((task) => <Task key={task.id} task={task} />)
            ) : (
                <p className="text-gray-400 text-sm text-center">No tasks in {title}</p>
            )}
             <button 
                className="w-full mt-2 mx-2 bg-red-300 px-2 py-1 rounded hover:bg-red-200 items-center text-sm text-white"
                onClick={handleDeleteTag}>
                    Delete Tag
            </button>
        </div>
    </div>
  )
}
