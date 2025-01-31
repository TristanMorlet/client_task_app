import React from 'react'
import { useSelector } from 'react-redux';
import TaskColumn from './TaskColumn';
import { groupTasksByStatus } from '../functions/groupByStatus';


export default function TaskList({}) {
    const TODO = "To-Do"
    const STARTED = "Started"
    const FINISHED = "Finished"

    const tasks = useSelector((state) => state.tasks.tasks);
    const groupedTasks = groupTasksByStatus(tasks);
    const defaultTaskLists = [TODO, STARTED, FINISHED];
  
    return (
    <div className="grid grid-cols-3 gap-4 p-5 w-2/3">
        {defaultTaskLists.map((title, index) => (
            <TaskColumn key={index} title={title} tasks={groupedTasks[title] || []} />
        ))}
    </div>
  )
}

 