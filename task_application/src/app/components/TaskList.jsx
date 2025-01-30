import React from 'react'
import { useState } from 'react'
import Task from './Task';


export default function TaskList({}) {
    const [openLists, setOpenLists] = useState({
            "To-Do": false,
            "Started": false,
            "Completed": false,
        });


    const [tasks, setTasks] = useState([])
    
    const groupedTasks = {
        "To-Do": tasks.filter((task) => task.status === "To-Do"),
        "Started": tasks.filter((task) => task.status === "Started"),
        "Completed": tasks.filter((task) => task.status === "Completed")
    }
    function toggleListView(title){
        
        setOpenLists((prev) => {
            console.log(title);
            const test_var = {...prev, [title]: !prev[title]};
            console.log(test_var);
            
            return test_var});
    };

    function handleAddTask(newTask){
        setTasks((prev) => ([...prev, newTask]))
    } 

  
    return (
    <div className="grid grid-cols-3 gap-4 p-5 w-2/3">
        {Object.keys(groupedTasks).map((title, index) => {
            console.log({title, state:openLists[title]})
            return (
            <div key={index} className="p-4 flex flex-col bg-gray-50 rounded-lg border border-gray-300">
                <h4 
                    className="text-lg font-semibold p-3 border-b cursor-pointer flex justify-between items-center"
                    onClick={() => toggleListView(title)}>
                        {title}
                        <span>{openLists[title] ? "▲" : "▼"}</span>
                </h4>
                <div className={`overflow-hidden transition-all duration-300 ${openLists[title] === true ? "max-h-40 opacity-100 visibility-visible": "max-h-0 opacity-0 visibility-hidden"} ease-in-out`}>
                {groupedTasks[title].length > 0 ? (
                    groupedTasks[title].map((task) => (
                        <Task key={task.id} task={task} />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center">No tasks in {title}</p>
                  )}
                    <PopUpForm onAddTask={handleAddTask}/>
                </div>
            </div>
        )})}
    </div>
  )
}

function PopUpForm({onAddTask}) {
    const [formOpen, setFormOpen] = useState(false);
    const [taskName, setTaskName] = useState("")
    const [assignedTo, setAssignedTo] = useState("None")
    const [deadline, setDeadline] = useState("")
    const [tags, setTags] = useState([])
    const [status, setStatus] = useState("To-Do")





    function togglePopUp() {
        setFormOpen(!formOpen)
    }


    function handleSubmit(e) {
        e.preventDefault();
        
        if (!taskName.trim() || !deadline.trim()) return;

        const newTask = {
            id: Date.now(),
            name: taskName,
            assignedTo: assignedTo,
            deadline: deadline,
            tags: tags,
            status: status,
            overdue: false,
        }

        onAddTask(newTask)
        togglePopUp();
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

                    <div className="bg-white p-6 rounded-lg w-1/5 shadow-lg">
                        <h2 className="text-xl font-bold mb-5 text-center"> New Task </h2>

                        <form>

                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Task Name:</label>
                                <input
                                    type="text-area"
                                    id="name"
                                    placeholder="Enter task name"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focuss:ring focus:border-gray-200" 
                                />
                            </div>

                            <div className="mb-4 flex items-center justify-between"> 
                                <label htmlFor="assign" className="mb-4 text-gray-700 font-medium">Assign To:</label>
                                <select 
                                    className="mb-4 border border-gray-300 rounded px-3 py-2 w-2/3 focus:border-gray-200"
                                    value={assignedTo}
                                    onChange={(e) => setAssignedTo(e.target.value)}>
                                    <option>None</option>
                                    <option>Staff 1:</option>
                                    <option>Staff 2</option>
                                    <option>Staff 3</option>
                                    <option>Staff 4</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="deadline" className="block mb-1 text-gray-700 font-medium">Deadline:</label>
                                <input
                                    type="text"
                                    id="deadline"
                                    placeholder="DD/MM/YYYY"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-gray-200"
                                />
                            </div>

                            <div className="mb-4 flex items-center justify-between">
                                <label htmlFor="tags" className="mb-4 text-gray-700 font-medium">Tags:</label>
                                <select 
                                    className="mb-4 border border-gray-300 rounded px-3 py-2 w-2/3 focus:border-gray-200"
                                    multiple
                                    value={tags}
                                    onChange={(e) => setTags([...e.target.selectedOptions].map(opt => opt.value))}>
                                    <option>None</option>
                                    <option>Tag 1:</option>
                                    <option>Tag 2</option>
                                    <option>Tag 3</option>
                                    <option>Tag 4</option>
                                </select>
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
    )
}