import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TaskColumn from './TaskColumn';
import { groupTasksByStatus } from '../functions/groupByStatus';
import { incrementTaskAssigned, incrementTaskCompleted, decrementTaskAssigned, decrementTaskCompleted } from '../state/staff/staffSlice';


export default function TaskList({}) {
    const TODO = "To-Do"
    const STARTED = "Started"
    const FINISHED = "Finished"
    
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks.tasks);
    const filters = useSelector((state) => {
        return state.tasks.filters;
    });
    console.log(filters);
    console.log(tasks);

    const filteredTasks = tasks.filter((task) => {
        const matchesAssignedTo = filters.assignedTo.length === 0 || filters.assignedTo.includes(task.assignedTo);
        const matchesTags = filters.tags.length === 0 || task.tags.some((tag) => filters.tags.includes(tag));
        const matchesDateAdded = filters.dateAdded === null || task.dateAdded === filters.dateAdded;
        const matchesOverdue = filters.overdue === false || !task.overdue;
        return matchesAssignedTo && matchesTags && matchesDateAdded && matchesOverdue;
    })



    const groupedTasks = groupTasksByStatus(filteredTasks);
    const defaultTaskLists = [TODO, STARTED, FINISHED];
  
    return (
    <div className="grid grid-cols-3 gap-4 p-5 w-2/3">
        {defaultTaskLists.map((title, index) => (
            <TaskColumn key={index} title={title} tasks={groupedTasks[title] || []} />
        ))}
    </div>
  )
}

 