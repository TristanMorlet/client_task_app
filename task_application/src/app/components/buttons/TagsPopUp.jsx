import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { groupTasksByTags } from '../../utils/groupByTags'
import TagsColumn from '../TagsColumn'
import { addTag, setTags } from '../../state/tasks/tagSlice'
export default function TagsPopUp() {
    const [tagName, setTagName] = useState("")
    const [formOpen, setFormOpen] = useState(false)
    const tags = useSelector((state) => state.tags.tags)
    const dispatch = useDispatch()
    function togglePopUp() {
        setFormOpen(!formOpen)
        if (!formOpen) {
          setTagName("");
        }
    }
    
    
    async function handleSubmit(e) {
        e.preventDefault()
        
        if (!tagName.trim || tags.includes(tagName) ) return;
    
        const newTag = {
            tagName: tagName
        }
    
        try {
          const response = await fetch("/api/tagAPIs/createTag", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newTag)
          })
    
          const dbTag = await response.json()
    
          console.log("New tag created in DB", dbTag)
    
          dispatch(addTag(dbTag))
          togglePopUp()
    
        } catch (err) {
          console.error("Error creating tag", err)
        }
    
      }
  return (
    <div>
        <button 
          className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-200"
          onClick={togglePopUp}>
              +
        </button>

          {formOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

              <div className="bg-white p-6 rounded-lg w-3/5 md:w-1/5 shadow-lg">
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
                <div className="p-2 flex justify-end space-x-3 mt-6 w-11/12 md:w-11/12">
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
