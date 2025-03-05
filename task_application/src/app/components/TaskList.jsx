'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TaskColumn from './TaskColumn';
import { groupTasksByStatus } from '../utils/groupByStatus';
import { setTasks } from '../state/tasks/taskSlice';


export default function TaskList({searchText, role}) {
    const TODO = "To-Do"
    const STARTED = "Started"
    const FINISHED = "Finished"
    
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        async function fetchTasks() {

        try {
            const res = await fetch("/api/taskAPIs/getTasks");
            const data = await res.json()
            console.log(data)
            dispatch(setTasks(data))
        } catch (err) {
            console.error("Failed to Fetch Tasks", err)
        }
        }
        fetchTasks();
    }, [dispatch])




    const filters = useSelector((state) => {
        return state.tasks.filters;
    });
    console.log("Filters available to TaskList component", filters);
    console.log("Task list available to TaskList component", tasks);

    const filteredTasks = tasks.filter((task) => {
        const matchesSearchText = task.name.toLowerCase().includes(searchText.toLowerCase());

        const matchesAssignedTo = filters.assignedTo.length === 0 || filters.assignedTo.includes(task.assignedTo);

        const matchesTags = filters.tags.length === 0 || task.tags.some((tag) => {
            console.log(tag)
            return filters.tags.includes(tag.id)
        });

        const matchesDateAdded = filters.dateAdded === null || task.dateAdded === filters.dateAdded;

        const matchesOverdue = filters.overdue === false || !task.overdue;

        const matchesDateRange = filters.dateRange && filters.dateRange.length === 2
            ? tasks.some(task => {

                const taskDate = new Date(task.createdAt).getTime()
                console.log(taskDate)
                const startDate = new Date(filters.dateRange[0]).getTime()
                console.log(startDate)
                const endDate = new Date(filters.dateRange[1]).getTime()
                console.log(endDate)

                return taskDate >= startDate && taskDate <= endDate
            })
            : true;

        return matchesSearchText && matchesAssignedTo && matchesTags && matchesDateAdded && matchesOverdue && matchesDateRange;
    })



    const groupedTasks = groupTasksByStatus(filteredTasks);
    console.log(groupedTasks)
    const defaultTaskLists = [TODO, STARTED, FINISHED];
  
    return (
    <div className="grid grid-cols-3 gap-4 p-5 w-2/3">
        {defaultTaskLists.map((title, index) => (
            <TaskColumn key={index} title={title} tasks={groupedTasks[title] || []} role={role} />
        ))}
    </div>
  )
}

 