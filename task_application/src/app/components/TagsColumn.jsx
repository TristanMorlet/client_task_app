import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleListView } from '../state/tasks/tagListSlice';
import Task from './Task';
import { deleteTag } from '../state/tasks/tagSlice';
export default function TagsColumn({tagName, tagId, tasks, role}) {

    const dispatch = useDispatch();
    
    const tagsState = useSelector((state) => state.tagList.tagList)
    console.log("List of Tags available to TagsColumn", tagsState)
    console.log(tagName)
    function handleToggleListView() {
        dispatch(toggleListView(tagName))
    }

    function handleDeleteTag() {

        async function deleteDBTag(id) {
            try { 
                const res = await fetch(`/api/tagAPIs/${id}`, {
                    method: "DELETE"
                })
                console.log(res)
                if (!res.ok) {
                    throw new Error("Failed to delete Tag")
                }

                console.log("Tag deleted")
            } catch (err) {
                console.error("Error deleting tag", err)
            }
        }
        console.log(tagName)
        deleteDBTag(tagId)
        console.log("Name of Tag To Be Deleted", tagName)
        dispatch(deleteTag(tagId))

    }
  
    return (
    <div className="p-4 flex flex-col bg-gray-50 rounded-lg border border-gray-300 h-fit">
        <h4 
            className="text-sm md:text-lg font-semibold p-3 border-b cursor-pointer flex justify-between items-center"
            onClick={handleToggleListView}>
                {tagName}
                <span>{tagsState[tagName] ? "▲" : "▼"}</span>
        </h4>
        <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                tagsState[tagName] ? 'max-h-screen overflow-y-auto' : 'max-h-0'
                }`}
        >
            {tasks.length > 0 ? (
                tasks.map((task) => <Task key={task.id} task={task} role={role} />)
            ) : (
                <p className="text-gray-400 text-sm text-center">No tasks in {tagName}</p>
            )}
             <button 
                className="w-11/12 md:w-full mt-2 mx-2 bg-red-300 px-2 py-1 rounded hover:bg-red-200 items-center text-sm text-white"
                onClick={handleDeleteTag}>
                    Delete Tag
            </button>
        </div>
    </div>
  )
}
