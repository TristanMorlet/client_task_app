'use client'

import React, {useMemo} from 'react'
import { useSelector } from 'react-redux'

export default function ProgressBar({page, member, user}) {
    const tasks = useSelector((state) => state.tasks.tasks)
    console.log("Task List Available to Progress Bar", tasks)
    const staff = useSelector((state) => state.staff)
    console.log(user)

    

    
    
    const staffMember = (user.role === "worklead") ? member : staff.find((s) => s.userId === user.id)


    const totalTasks = tasks.length
    const totalCompletedTasks = tasks.filter(task => task.status === "Finished").length
    const overallProgress = totalTasks > 0 ? (totalCompletedTasks / totalTasks) * 100: 0;

    const assignedTasks = useMemo(() => {
        return tasks.filter(task => task.assignedTo === staffMember?.id);
    }, [tasks, staffMember?.id]);

    const completedTasks = useMemo(() => {
        return assignedTasks.filter(task => task.status === "Finished");
    }, [assignedTasks]);

    const progressPercentage = assignedTasks.length > 0 
        ? (completedTasks.length / assignedTasks.length) * 100 
        : 0;

    console.log("Found Staff Member", staffMember)

    
    
  
  
    return (
    <div>
        {page === "alltasks" && user.role === "worklead" && (
            <div className="px-4 py-2 fixed bottom-0 w-full">
                <label htmlFor='progressbar' className="text-sm block text-center mb-2">
                    Completion Rate: {overallProgress.toFixed(0)}%
                </label>
                <progress 
                    id="progressbar"
                    value={overallProgress}
                    max="100"
                    className="w-full h-2 rounded-md bg-gray-200 
                    [&::-webkit-progress-bar]:bg-gray-200 
                    [&::-webkit-progress-value]:bg-green-500"
                />
            </div>
        )}

        {page === "alltasks" && user.role === "staff" && (
            <div className="px-4 py-2 fixed bottom-0 w-full">
                <label htmlFor='progressbar' className="text-sm block text-center mb-2">
                    Completion Rate: {progressPercentage.toFixed(0)}%
                </label>
                <progress 
                    id="progressbar"
                    value={progressPercentage}
                    max="100"
                    className="w-full h-2 rounded-md bg-gray-200 
                    [&::-webkit-progress-bar]:bg-gray-200 
                    [&::-webkit-progress-value]:bg-green-500"
                />
            </div>
        )}



        {page === "metrics" && (
        <div>
            <label htmlFor='progressbar' className="text-xs md:text-sm">
                Completion Rate: {progressPercentage.toFixed(0)}%
            </label>
            <progress 
                id="progressbar"
                value={progressPercentage}
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
