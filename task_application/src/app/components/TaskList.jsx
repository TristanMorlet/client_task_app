import React from 'react'
import { useState } from 'react'
export default function TaskList({}) {
    const [openLists, setOpenLists] = useState({
            "To-Do": false,
            "Started": false,
            "Finished": false,
        });
    const [listToDo, setListToDo] = useState([]);

    function toggleListView(title){
        setOpenLists((prev) => ({ ...prev, [title]: !prev[title]}));
    };

    function handleAddTask(list){
        setListToDo((prev) => ([...prev, ]))
    } 
  
    return (
    <div className="grid grid-cols-3 gap-4 p-5 w-2/3">
        {["To-Do", "Started", "Finished"].map((title, index) => (
            <div key={index} className="p-4 flex flex-col bg-gray-50 rounded-lg border border-gray-300">
                <h4 
                    className="text-lg font-semibold p-3 border-b cursor-pointer flex justify-between items-center"
                    onClick={() => toggleListView(title)}>
                        {title}
                        <span>{openLists[title] ? "▲" : "▼"}</span>
                </h4>
                <div className={`flex flex-col overflow-hidden transition-all duration-300 ${openLists[title] ? "max-h-40 opacity-100 visibility-visible": "max-h-0 opacity-0 visibility-hidden"} ease-in-out`}>
                    <p className="my-2 px-3">Item {index + 1}</p>
                    <PopUpForm/>
                </div>
            </div>
        ))}
    </div>
  )
}

function PopUpForm() {
    const [formOpen, setFormOpen] = useState(false);
    function togglePopUp() {
        setFormOpen(!formOpen)
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

                    <div className="bg-white p-8 rounded-lg w-1/4">
                        <h2 className="text-xl font-bold mb-4"> New Task </h2>

                        <form 
                            onSubmit={()=> console.log(hi)}>

                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1">Task Name:</label>
                                <input
                                    type="text-area"
                                    id="name"
                                    placeholder="Enter task name"
                                    className="w-full p-2 border border-gray-300 rounded focus:border-gray-200" 
                                />
                            </div>

                            <div className="mb-4"> 
                                <label htmlFor="assign" className="mb-4 p">Assign To:</label>
                                <select className="ml-8 border border-gray-300 rounded px-2 py-1 focus:border-gray-200">
                                    <option>None</option>
                                    <option>Staff 1:</option>
                                    <option>Staff 2</option>
                                    <option>Staff 3</option>
                                    <option>Staff 4</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="deadline" className="block mb-1">Deadline:</label>
                                <input
                                    type="text"
                                    id="deadline"
                                    placeholder="DD/MM/YYYY"
                                    className="w-full p-2 border border-gray-300 rounded focus:border-gray-200"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="tags" className="mb-4 p-1">Tags:</label>
                                <select className="ml-16 border border-gray-300 rounded px-2 py-1 focus:border-gray-200">
                                    <option>None</option>
                                    <option>Tag 1:</option>
                                    <option>Tag 2</option>
                                    <option>Tag 3</option>
                                    <option>Tag 4</option>
                                </select>
                            </div>
                            <div className="p-2 flex items-center justify-center">
                                <button
                                    type="submit"
                                    onClick={togglePopUp}
                                    className="mx-1  rounded-md px-4 py-2 bg-blue-500 text-center text-bold hover:bg-blue-300"
                                >
                                    Add
                                </button>
                                <button
                                    onClick={togglePopUp}
                                    className="mx-1 rounded-md px-4 py-2 bg-gray-300 text-center text-bold hover: bg-gray-200"
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