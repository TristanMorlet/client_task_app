'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import TaskColumn from './TaskColumn';
import { groupTasksByStatus } from '../utils/groupByStatus';
import { setTasks } from '../state/tasks/taskSlice';
import { updateTask } from '../state/tasks/taskSlice';

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

    useEffect(() => {
        async function checkOverdueTasks() {
            const today = new Date().getTime();
            const updates = tasks.map(async (task) => {
                const [day, month, year] = task.deadline.split('/').map(Number); 
                const taskDeadline = new Date(year, month - 1, day).getTime();
                if (taskDeadline < today && !task.overdue && task.status !== "Finished") {
                    try {
                        const res = await fetch(`/api/taskAPIs/${task.id}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json"},
                            body: JSON.stringify({overdue: true})
                        })
                        if (res.ok){
                            dispatch(updateTask({ taskId: task.id, property: "overdue", value: true}))
                        } else {
                            console.error("Failed to update task overdue")
                        }
                    } catch (error) {
                        console.error("Error updating task overdue")
                    }


                }

                if (task.status === "Finished" && task.overdue) {
                    try {
                        const res = await fetch(`/api/taskAPIs/${task.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type" : "application/json"
                            },
                            body: JSON.stringify({overdue: false})
                        })

                        if (res.ok) {
                            dispatch(updateTask({taskId: task.id, property: "overdue", value: false}))
                        } else {
                            console.error("Failed to update task overdue")
                        }
                    } catch (error) {
                        console.error("Error updating task overdue")
                    }
                }
            })

            await Promise.all(updates)
            }


        checkOverdueTasks();
        const interval = setInterval(checkOverdueTasks, 24 * 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, [tasks, dispatch]);


    const filters = useSelector((state) => {
        return state.tasks.filters;
    });
    console.log("Filters available to TaskList component", filters);
    console.log("Task list available to TaskList component", tasks);

    const filteredTasks = tasks.filter((task) => {
        const matchesSearchText = task.name.toLowerCase().includes(searchText.toLowerCase());

        const matchesAssignedTo =  task.assignedTo === filters.assignedTo || filters.assignedTo === null;

        const matchesTags = filters.tags.length === 0 || task.tags.some((tag) => {
            console.log(tag)
            return filters.tags.includes(tag.id)
        });

        const matchesDateAdded = filters.dateAdded === null || task.dateAdded === filters.dateAdded;

        const matchesOverdue = filters.overdue === false || task.overdue;

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
    // <div className="grid grid-cols-3 gap-2 md:gap-4 p-5 w-full md:w-2/3">
    <div className="p-5 m-2 flex flex-col space-y-2 md:space-y-0 gap-2 md:grid md:grid-cols-3 md:gap-4 md:w-2/3">
        {defaultTaskLists.map((title, index) => (
            <TaskColumn key={index} title={title} tasks={groupedTasks[title] || []} role={role} />
        ))}
    </div>
  )
}

 