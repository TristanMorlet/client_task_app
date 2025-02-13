import React from 'react'
import { useSelector } from 'react-redux'

export default function ProgressBar({page, member}) {
    const tasks = useSelector((state) => state.tasks.tasks)
    console.log("Task List Available to Progress Bar", tasks)

    const completedTasks = tasks.filter((task) => {
        const finished = task.status === "Finished"
        return finished
        
    })
    console.log("Total Completed Tasks", completedTasks)
    
  
  
    return (
    <div>
        {page === "alltasks" && (
            <div className="px-4 py-2 fixed bottom-0 w-full">
                <label htmlFor='progressbar' className="text-sm block text-center mb-2">
                    Completion Rate: {tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0}%
                </label>
                <progress 
                    id="progressbar"
                    value={tasks.length > 0 ? ((completedTasks.length / tasks.length) * 100) : 0}
                    max="100"
                    className="w-full h-2 rounded-md bg-gray-200 
                    [&::-webkit-progress-bar]:bg-gray-200 
                    [&::-webkit-progress-value]:bg-green-500"
                />
            </div>
        )}



        {page === "metrics" && (
        <div>
            <label htmlFor='progressbar' className="text-sm">
                Completion Rate: {member.tasksAssigned > 0 ? Math.round((member.tasksCompleted / member.tasksAssigned) * 100) : 0}%
            </label>
            <progress 
                id="progressbar"
                value={member.tasksAssigned > 0 ? ((member.tasksCompleted / member.tasksAssigned) * 100) : 0}
                max="100"
                className="w-full h-2 rounded-md bg-gray-200 
                [&::-webkit-progress-bar]:bg-gray-200 
                [&::-webkit-progress-value]:bg-green-500"
            />
        </div>
        )}
        
    </div>
  )
}
