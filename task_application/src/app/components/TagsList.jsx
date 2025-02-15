import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { groupTasksByTags } from '../functions/groupByTags'
import TagsColumn from './TagsColumn'
import { addTag } from '../state/tasks/tagSlice'
export default function TagsList( {role} ) {
  
  const tasks = useSelector((state) => state.tasks.tasks)
  console.log("Tasks available to TagsList component", tasks)
  const tags = useSelector((state) => state.tags)
  console.log("Tags available to TagsList component", tags)
  const groupedTasksbyTags = groupTasksByTags(tasks);
  console.log("Length of the list of Tags", tags.length)
  const [tagName, setTagName] = useState("")
  const [formOpen, setFormOpen] = useState(false)

  const dispatch = useDispatch();

  function togglePopUp() {
    setFormOpen(!formOpen)
    if (!formOpen) {
      setTagName("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    if (!tagName.trim || tags.includes(tagName) ) return;

    const newTag = tagName
    dispatch(addTag(newTag));
    togglePopUp();

  }

  
  
  
  
  return (
    <div className="flex items-center justify-start">
      <div className='grid grid-flow-col auto-cols-max gap-4 p-5 overflow-x-auto'>
          {tags.map((title, index) => (
              <TagsColumn key={index} title={title} tasks={groupedTasksbyTags[title] || []} />
          ))}
      </div>
      {role === "worklead" && (
        <div>
        <button 
          className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-200"
          onClick={togglePopUp}>
              +
        </button>

          {formOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

              <div className="bg-white p-6 rounded-lg w-1/5 shadow-lg">
                <h2 className="text-xl font-bold mb-5 text-center"> New Tag </h2>

                <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Tag Name:</label>
                    <input
                        type="text-area"
                        id="name"
                        placeholder="Enter tag name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
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
      )}
      
    </div>
  )
}
